import { AuthModule, InferModuleType } from "./module-type";

export interface WebpackRequireType {
  /**
   * Hàm require chính: Nhận vào Module ID và trả về exports của module đó
   */
  <T>(moduleId: string | number): T;

  /**
   * (s.m) Map chứa tất cả các Module Definitions (Source code của module)
   * Key: Module ID, Value: Factory Function
   */
  m: Record<
    string | number,
    (module: any, exports: any, require: WebpackRequireType) => void
  >;

  /**
   * (s.c) Cache chứa các Module đã được thực thi (Loaded Modules)
   * Key: Module ID, Value: Module Object { id, loaded, exports }
   */
  c: Record<
    string | number,
    { exports: any; loaded?: boolean; id?: string | number }
  >;

  /**
   * (s.d) Define Getter: Helper để định nghĩa các property cho exports (ESM compatibility)
   */
  d: (exports: any, definition: Record<string, () => any>) => void;

  /**
   * (s.n) Compatibility Getter: Helper lấy default export (cho module CommonJS/ESM)
   */
  n: (module: any) => () => any;

  /**
   * (s.r) Helper đánh dấu một object là ES Module (__esModule: true)
   */
  r: (exports: any) => void;

  /**
   * (s.t) Helper tạo namespace object (ít dùng trực tiếp)
   * mode: bitmask flags
   */
  t: (value: any, mode: number) => any;

  /**
   * (s.o) Helper kiểm tra Object.hasOwnProperty
   */
  o: (object: any, property: string) => boolean;

  /**
   * (s.e) Ensure Chunk: Hàm tải Chunk bất đồng bộ (Lazy Load)
   * Trả về Promise hoàn thành khi chunk đã tải xong
   */
  e: (chunkId: string | number) => Promise<any[]>;

  /**
   * (s.u) Get Chunk URL: Trả về đường dẫn file JS của chunk
   * Lưu ý: Hash trong hàm này thường bị hardcode
   */
  u: (chunkId: string | number) => string;

  /**
   * (s.l) Load Script: Hàm nội bộ để tạo thẻ <script> và append vào DOM
   */
  l: (
    url: string,
    done: Function,
    key: string,
    chunkId: string | number
  ) => void;

  /**
   * (s.g) Global: Tham chiếu đến global object (window/self/global)
   */
  g: typeof globalThis;

  /**
   * (s.p) Public Path: Đường dẫn gốc (VD: "/_next/")
   */
  p: string;

  /**
   * (s.f) Chunk Loading Handlers: Map chứa các hàm xử lý việc tải chunk (jsonp, import...)
   */
  f: Record<
    string,
    (chunkId: string | number, promises: Promise<any>[]) => void
  >;
}

export interface WebpackRequirePrettier {
  <ID extends string | number, T = unknown>(moduleId: ID): InferModuleType<
    ID,
    T
  >;

  moduleDefinitions: WebpackRequireType["m"];
  loadedModules: WebpackRequireType["c"];
  definePropertyGetters: WebpackRequireType["d"];
  getDefaultExport: WebpackRequireType["n"];
  markAsESModule: WebpackRequireType["r"];
  createNamespaceObject: WebpackRequireType["t"];
  hasOwnProperty: WebpackRequireType["o"];
  ensureChunk: WebpackRequireType["e"];
  getChunkUrl: WebpackRequireType["u"];
  loadScript: WebpackRequireType["l"];
  globalObject: WebpackRequireType["g"];
  publicPath: WebpackRequireType["p"];
  chunkLoadingHandlers: WebpackRequireType["f"];
}
