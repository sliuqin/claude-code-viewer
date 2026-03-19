# JSONL 会话格式分析报告

## 数据来源

**文件路径**: `/Users/sliuqin/.claude/projects/-Users-sliuqin-Projects-Squirrel-Server/30230acf-3a75-48af-941d-4070568e1640.jsonl`

**统计信息**:
- 总条目数：102 条
- 文件大小：63.5KB
- Claude Code 版本：2.1.78

---

## 格式定义状态

### ✅ 已定义的格式 (Supported)

| 类型 | 数量 | Schema 位置 | 状态 |
|------|------|-------------|------|
| `user` | 32 | `UserEntrySchema.ts` | ✅ 完整支持 |
| `assistant` | 55 | `AssistantEntrySchema.ts` | ✅ 完整支持（包含 thinking 内容类型） |
| `system` | 4 | `SystemEntrySchema.ts` | ✅ 支持多种 subtype |
| `progress` | 3 | `ProgressEntrySchema.ts` | ✅ 完整支持 |
| `file-history-snapshot` | 7 | `FileHistorySnapshotEntrySchema.ts` | ✅ 完整支持 |
| `last-prompt` | 1 | `LastPromptEntrySchema.ts` | ✅ 完整支持 |

### ⚠️ 未定义的格式 (Missing)

| 类型 | 数量 | 描述 | 优先级 |
|------|------|------|--------|
| 无 | 0 | 所有格式都已支持 | ✅ |

---

## 详细分析

### 1. User 类型 (32 条)

**完整字段示例**:
```json
{
  "type": "user",
  "uuid": "f6ecb993-8f52-4864-ac6d-534209f0657e",
  "timestamp": "2026-03-18T07:49:50.905Z",
  "parentUuid": null,
  "isSidechain": false,
  "promptId": "13a6ef8d-33f4-4d07-9f58-a359f5bcbd00",
  "message": {
    "role": "user",
    "content": "db.sqlite3 需要放置到 @data 里面。"
  },
  "permissionMode": "default",
  "userType": "external",
  "entrypoint": "cli",
  "cwd": "/Users/sliuqin/Projects/Squirrel_Server",
  "sessionId": "30230acf-3a75-48af-941d-4070568e1640",
  "version": "2.1.78",
  "gitBranch": "master"
}
```

**Schema 匹配**: ✅ 完全匹配 `UserEntrySchema`

---

### 2. Assistant 类型 (55 条)

**完整字段示例**:
```json
{
  "type": "assistant",
  "uuid": "8635182a-80e5-4da9-9afc-ae9bfb3d6e8c",
  "timestamp": "2026-03-18T07:49:59.290Z",
  "parentUuid": "6da7102e-f224-4c03-93f3-9d22fc6f0927",
  "isSidechain": false,
  "message": {
    "model": "qwen3.5-plus",
    "id": "msg_613e075f-e07b-4bf6-b2c9-68f04f5c7788",
    "role": "assistant",
    "type": "message",
    "content": [
      {
        "type": "text",
        "text": "我将帮你把 `db.sqlite3` 文件移动到 `data` 目录中。"
      }
    ],
    "usage": {
      "input_tokens": 43826,
      "output_tokens": 0
    }
  },
  "userType": "external",
  "entrypoint": "cli",
  "cwd": "/Users/sliuqin/Projects/Squirrel_Server",
  "sessionId": "30230acf-3a75-48af-941d-4070568e1640",
  "version": "2.1.78",
  "gitBranch": "master"
}
```

**变体**:
- 包含 `thinking` 内容类型
- 包含 `tool_calls` 的工具调用
- 包含 `sourceToolAssistantUUID` 的后续响应

**Schema 匹配**: ✅ 完全匹配 `AssistantEntrySchema`

---

### 3. System 类型 (4 条)

所有 system 类型都使用 `subtype: "turn_duration"`:

```json
{
  "type": "system",
  "subtype": "turn_duration",
  "durationMs": 61244,
  "uuid": "b1339c99-a952-4c23-97b6-67f0ec067d93",
  "timestamp": "2026-03-18T07:51:37.169Z",
  "isMeta": false,
  "isSidechain": false,
  "userType": "external",
  "entrypoint": "cli",
  "cwd": "/Users/sliuqin/Projects/Squirrel_Server",
  "sessionId": "30230acf-3a75-48af-941d-4070568e1640",
  "version": "2.1.78",
  "gitBranch": "master",
  "slug": "typed-doodling-sedgewick"
}
```

**Schema 匹配**: ✅ 匹配 `TurnDurationEntrySchema`（`SystemEntrySchema` 的子 Schema）

**已支持的 subtype**:
- ✅ `turn_duration` - 当前文件使用
- ✅ `stop_hook_summary` - 已定义 Schema
- ✅ `local_command` - 已定义 Schema
- ✅ `compact_boundary` - 已定义 Schema
- ✅ `api_error` - 已定义 Schema
- ✅ (无 subtype) - `SystemEntryWithContentSchema` 兜底

---

### 4. Progress 类型 (3 条)

**Schema 匹配**: ✅ 完全匹配 `ProgressEntrySchema`

---

### 5. File-History-Snapshot 类型 (7 条)

**示例**:
```json
{
  "type": "file-history-snapshot",
  "messageId": "f6ecb993-8f52-4864-ac6d-534209f0657e",
  "snapshot": {
    "messageId": "f6ecb993-8f52-4864-ac6d-534209f0657e",
    "trackedFileBackups": {},
    "timestamp": "2026-03-18T07:49:50.905Z"
  },
  "isSnapshotUpdate": false
}
```

**变体**:
- `isSnapshotUpdate: true` - 增量更新
- `trackedFileBackups` 包含实际文件备份信息

**Schema 匹配**: ✅ 完全匹配 `FileHistorySnapshotEntrySchema`

---

### 6. ✅ Last-Prompt 类型 (1 条) - **已支持**

**原始数据**:
```json
{
  "type": "last-prompt",
  "lastPrompt": "是",
  "sessionId": "30230acf-3a75-48af-941d-4070568e1640"
}
```

**实现状态**: ✅ 已完整支持

**Schema 位置**: `src/lib/conversation-schema/entry/LastPromptEntrySchema.ts`

**注意**: 由于该类型缺少标准字段（`uuid`, `timestamp`, `isSidechain` 等），**不继承 `BaseEntrySchema`**。

---

## 当前 Schema 覆盖情况

```
ConversationSchema (z.union)
├── UserEntrySchema              ✅ 覆盖 (32 条)
├── AssistantEntrySchema         ✅ 覆盖 (55 条)
├── SummaryEntrySchema           ⚪ 未使用 (0 条)
├── SystemEntrySchema            ✅ 覆盖 (4 条)
│   ├── TurnDurationEntrySchema      ✅
│   ├── StopHookSummaryEntrySchema   ⚪
│   ├── LocalCommandEntrySchema      ⚪
│   ├── CompactBoundaryEntrySchema   ⚪
│   ├── ApiErrorEntrySchema          ⚪
│   └── SystemEntryWithContentSchema ⚪
├── FileHistorySnapshotEntrySchema ✅ 覆盖 (7 条)
├── QueueOperationEntrySchema    ⚪ 未使用 (0 条)
├── ProgressEntrySchema          ✅ 覆盖 (3 条)
├── CustomTitleEntrySchema       ⚪ 未使用 (0 条)
├── AgentNameEntrySchema         ⚪ 未使用 (0 条)
└── LastPromptEntrySchema        ✅ 覆盖 (1 条)

总计：102 条记录，100% 覆盖
```

---

## 建议操作

### ✅ 已完成 (P0)

1. **已添加 `LastPromptEntrySchema`** - `src/lib/conversation-schema/entry/LastPromptEntrySchema.ts`

2. **已更新 `ConversationSchema`** - 已包含 `LastPromptEntrySchema`

3. **已修复 `AssistantMessageSchema`** - 添加了可选字段以兼容新版 Claude Code：
   - `stop_reason` - 设为可选
   - `stop_sequence` - 设为可选
   - `usage.web_fetch_requests` - 添加
   - `usage.inference_geo` - 添加
   - `usage.iterations` - 添加
   - `usage.speed` - 添加

现在所有 102 条记录都能正确解析，不再产生 `x-error` 错误。

### 观察项

以下 Schema 已定义但在当前文件中未使用：
- `SummaryEntrySchema` - 会话摘要
- `QueueOperationEntrySchema` - 队列操作
- `CustomTitleEntrySchema` - 自定义标题
- `AgentNameEntrySchema` - Agent 名称

这些可能在其他会话中出现，取决于 Claude Code 的使用场景。

---

## 验证命令

```bash
# 运行类型检查
pnpm typecheck

# 运行测试
pnpm test

# 运行特定 Schema 测试
pnpm test LastPromptEntrySchema
```

所有验证均已通过：
- ✅ 类型检查通过
- ✅ 664 个测试全部通过
- ✅ `LastPromptEntrySchema` 4 个测试用例通过
- ✅ 实际 JSONL 文件验证：102 条记录 100% 解析成功
