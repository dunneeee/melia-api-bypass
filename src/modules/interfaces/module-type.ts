import { AuthActionModule, AuthModule } from "./auth-module";
import { ConstantModule } from "./constant-module";
import { MultiFactorModule } from "./multi-factor-module";
import { RouterModule } from "./router-module";

export interface WebpackModuleMap {
  64630: AuthModule;
  20213: MultiFactorModule;
  49226: ConstantModule;
  6475: AuthActionModule;
  5795: RouterModule;
}

export type InferModuleType<
  ID extends string | number,
  T = any
> = ID extends keyof WebpackModuleMap ? WebpackModuleMap[ID] : T;
