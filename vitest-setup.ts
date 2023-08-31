import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // 导入vitest相关拓展,或者自己实现该导入(注意matchers没有默认导出)

// 全局设置清理函数，避免每个测试文件手动清理
afterEach(() => {
    cleanup(); // 防止内存泄漏
});
