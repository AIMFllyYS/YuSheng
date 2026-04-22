# API 接口规范

本项目当前为**纯前端架构**，不存在自建后端服务。本规范分两部分：
- **内部应用协议**（当前阶段核心）
- **外部 HTTP 接口规范**（预备，供未来引入后端时使用）

---

## 第一部分：内部应用协议规范（当前阶段）

### 1. `app://` 微型应用协议

用于在 `features.ts` 中声明内嵌 React 微型应用，由 `FeatureWindow` 识别并通过 `AppRenderer` 渲染。

**格式：**
```
app://<appId>
```

**示例：**
```ts
// src/data/features.ts
{ type: "file", name: "MyGPA 计算器", url: "app://mygpa", icon: "fa-graduation-cap" }
```

**解析流程：**
```
features.ts (url: "app://mygpa")
    ↓ FeatureWindow 点击处理
    ↓ resolveAppUrl("app://mygpa")
    ↓ APP_REGISTRY["mygpa"] → { render: { type: "component", id: "mygpa" } }
    ↓ AppRenderer → lazy(() => import("@/apps/campus/MyGPA"))
    ↓ React.Suspense 渲染
```

**约定规则：**
- `appId` 全部小写，无连字符，与 `AppId` 类型保持一致。
- 新增应用必须先在 `src/apps/registry.ts` 中注册，再在 `features.ts` 中使用。
- `AppId` 为有限枚举类型，严禁使用动态字符串绕过类型检查。

---

### 2. `features.ts` URL 字段规范

`FeatureItem.url` 字段支持三种值，对应三种渲染策略：

| URL 格式 | 触发行为 | 使用场景 |
|----------|----------|----------|
| `app://<id>` | AppRenderer 懒加载 React 组件 | 新建微型应用（推荐） |
| `/tools/xxx.html` | iframe 内嵌本地 HTML | 历史 HTML 工具迁移 |
| `https://...` | `window.open` 新标签页 | 外部链接 |
| `#` | Toast 提示"请配置链接" | 占位，待开发 |

---

## 第二部分：外部 HTTP 接口规范（预备）

> 当前阶段不使用后端接口。以下规范用于未来引入 Supabase 或自建 API 时参考。

### 1. 基础规范

- **通信协议**：统一使用 `HTTPS`。
- **数据格式**：请求与响应均为 `JSON`（`Content-Type: application/json`）。
- **字符编码**：统一 `UTF-8`。

### 2. URL 设计规范（RESTful）

- 接口路径使用小写名词，多单词用中划线 `-` 分隔，例如 `/api/user-profiles`。
- 层级关系清晰，如 `/api/users/{userId}/articles`。
- Next.js 16 Route Handlers 放置于 `app/api/` 目录下，文件名为 `route.ts`。

### 3. HTTP 方法语义

| 方法 | 用途 |
|------|------|
| `GET` | 获取资源（幂等） |
| `POST` | 新建资源 |
| `PUT` | 完整更新资源 |
| `PATCH` | 部分更新资源 |
| `DELETE` | 删除资源 |

### 4. 统一响应结构

```json
{
  "code": 200,
  "message": "请求成功",
  "data": { }
}
```

### 5. 标准状态码

| 状态码 | 含义 |
|--------|------|
| `200` | 成功 |
| `400` | 请求参数错误 |
| `401` | 未授权（需登录） |
| `403` | 权限不足 |
| `404` | 资源不存在 |
| `500` | 服务器内部错误 |
