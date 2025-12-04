import { Either, Either2 } from "../../modules/result-handler";
import { UITracker } from "../ui-tracker";
import { UITrackingStateEnum } from "../ui-tracker-event";

function isEither(value: any): value is Either<any, any> {
  return (
    value &&
    typeof value === "object" &&
    "kind" in value &&
    (value.kind === "left" || value.kind === "right")
  );
}

function isEither2(value: any): value is Either2<any, any> {
  return (
    value &&
    typeof value === "object" &&
    "value" in value &&
    isEither(value.value)
  );
}

function extractEither(value: any): Either<any, any> | null {
  if (isEither2(value)) return value.value;
  if (isEither(value)) return value;
  return null;
}

function emitTracking(
  tracker: UITracker,
  event: string,
  state: UITrackingStateEnum,
  context: { functionName: string; className: string; args: any[] },
  data?: { result?: any; error?: any }
) {
  tracker.emit(event, {
    state,
    functionName: context.functionName,
    className: context.className,
    details: { args: context.args, ...data },
  });
}

function handleEitherResult(
  tracker: UITracker,
  event: string,
  context: { functionName: string; className: string; args: any[] },
  value: any
): void {
  const either = extractEither(value);

  if (!either) {
    emitTracking(tracker, event, UITrackingStateEnum.COMPLETED, context, {
      result: value,
    });
    return;
  }

  if (either.kind === "left") {
    emitTracking(tracker, event, UITrackingStateEnum.FAILED, context, {
      error: either.leftValue,
    });
  } else {
    emitTracking(tracker, event, UITrackingStateEnum.COMPLETED, context, {
      result: either.rightValue,
    });
  }
}

export function Track(event: string) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const tracker = UITracker.Instance;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const context = {
        functionName: propertyKey,
        className: _target.constructor.name,
        args,
      };

      emitTracking(tracker, event, UITrackingStateEnum.START, context);

      try {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result
            .then((resolvedValue: any) => {
              handleEitherResult(tracker, event, context, resolvedValue);
              return resolvedValue;
            })
            .catch((error: any) => {
              emitTracking(
                tracker,
                event,
                UITrackingStateEnum.FAILED,
                context,
                { error }
              );
              throw error;
            });
        }

        handleEitherResult(tracker, event, context, result);
        return result;
      } catch (error) {
        emitTracking(tracker, event, UITrackingStateEnum.FAILED, context, {
          error,
        });
        throw error;
      }
    };

    return descriptor;
  };
}
