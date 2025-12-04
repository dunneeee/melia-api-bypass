import { TypeSafeEventEmitter } from "../listeners/event-listener";
import { InferModuleType } from "./module-type";
import {
  WebpackRequireType as WebpackRequireFc,
  WebpackRequirePrettier,
} from "./types";

export interface WebpackEventMap {
  catchRequire: {
    require: WebpackRequirePrettier;
  };
}

export class WebpackRequire extends TypeSafeEventEmitter<WebpackEventMap> {
  private require: WebpackRequirePrettier | null = null;
  private readonly chunkName = "webpackChunk_N_E";
  private static instance: WebpackRequire;

  public static get Instance(): WebpackRequire {
    if (!WebpackRequire.instance) {
      WebpackRequire.instance = new WebpackRequire();
    }
    return WebpackRequire.instance;
  }

  public static get AuthModule(): InferModuleType<64630> {
    return WebpackRequire.Instance.RequireFunction(64630);
  }

  public static get MultiFactorModule(): InferModuleType<20213> {
    return WebpackRequire.Instance.RequireFunction(20213);
  }

  public static get ConstantModule(): InferModuleType<49226> {
    return WebpackRequire.Instance.RequireFunction(49226);
  }

  public static load(): void {
    if (!WebpackRequire.instance) {
      WebpackRequire.instance = new WebpackRequire();
    }
  }

  private constructor() {
    super();
    this.initHook();
  }

  private initHook() {
    if (this.require) return;
    window[this.chunkName] = window[this.chunkName] || [];

    const chunkArray = window[this.chunkName];

    const originalPush = chunkArray.push.bind(chunkArray);

    chunkArray.push = (chunk: any[]) => {
      this.extractRequire(chunk);
      return originalPush(chunk);
    };
  }

  private extractRequire(args: any[]) {
    const modules = args[1];
    for (const id in modules) {
      const originalFactory = modules[id];
      modules[id] = (module: any, exports: any, require: any) => {
        if (!this.require) {
          this.require = this.mapRequireFC(require);
          this.emit("catchRequire", { require: this.require });
        }
        return originalFactory(module, exports, require);
      };
      break;
    }
  }

  private mapRequireFC(require: WebpackRequireFc): WebpackRequirePrettier {
    const prettier = Object.assign(
      (moduleId: string | number) => require(moduleId),
      {
        moduleDefinitions: require.m,
        loadedModules: require.c,
        definePropertyGetters: require.d,
        getDefaultExport: require.n,
        markAsESModule: require.r,
        createNamespaceObject: require.t,
        hasOwnProperty: require.o,
        ensureChunk: require.e,
        getChunkUrl: require.u,
        loadScript: require.l,
        globalObject: require.g,
        publicPath: require.p,
        chunkLoadingHandlers: require.f,
      }
    ) as WebpackRequirePrettier;

    return prettier;
  }

  public get RequireFunction(): WebpackRequirePrettier {
    if (!this.require) {
      throw new Error("Webpack require function has not been captured yet.");
    }
    return this.require;
  }
}
