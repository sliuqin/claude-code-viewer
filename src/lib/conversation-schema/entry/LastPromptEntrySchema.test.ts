import { describe, expect, it } from "vitest";
import { LastPromptEntrySchema } from "./LastPromptEntrySchema";

describe("LastPromptEntrySchema", () => {
  it("有效的 last-prompt 条目应该通过验证", () => {
    const data = {
      type: "last-prompt",
      lastPrompt: "是",
      sessionId: "30230acf-3a75-48af-941d-4070568e1640",
    };

    const result = LastPromptEntrySchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("缺少必需字段应该验证失败", () => {
    const data = {
      type: "last-prompt",
      // 缺少 lastPrompt 和 sessionId
    };

    const result = LastPromptEntrySchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  it("lastPrompt 必须是字符串", () => {
    const data = {
      type: "last-prompt",
      lastPrompt: 123, // 错误类型
      sessionId: "test-session",
    };

    const result = LastPromptEntrySchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  it("sessionId 必须是字符串", () => {
    const data = {
      type: "last-prompt",
      lastPrompt: "确认",
      sessionId: null, // 错误类型
    };

    const result = LastPromptEntrySchema.safeParse(data);

    expect(result.success).toBe(false);
  });
});
