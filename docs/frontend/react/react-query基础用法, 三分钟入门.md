### 介绍
@tanstack/react-query我们熟悉的react-query升级版，现在支持vue等，可以当做服务器数据的全局状态，主要写一下在react项目中react-query可简化很多逻辑处理，下面写一下基础用法，[详情可查看文档](https://tanstack.com/query/latest/docs/framework/react/overview)

### 安装

```js
npm i @tanstack/react-query
```
app.tsx引入并注册

```js
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
     // 可增加全局配置
      refetchOnWindowFocus: false, // 窗口焦点重新获取
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
function App() {
  return (
    <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </PersistQueryClientProvider>
  );
}
export default App;
```
下面自己安装组件库 及 路由即可，不再一一列举，可以封装axios请求，react-query并不是一个ajax请求库，可以封装fetch或者axios用于请求，react-query用于管理请求

### useQuery基础用法
#### 场景1
如：我们在一个列表页面，进来会请求加载接口，我们给这个请求命名为applist，默认会触发一次apiApplicationList()是我们封装的请求接口，他的返回值会给applicationList，applicationList初始化为undefined，请注意初始值设置。我们列表直接渲染applicationList即可，applicationList是一个state

```js
// 获取列表
  const { data: applicationList, refetch: listRefetch } = useQuery({
    queryKey: ["applist"],
    queryFn: () => apiApplicationList(),
  });
```
#### 场景2
页面渲染有条件，如有id才查询，没有id不自动查询,enabled可输入条件，控制是否初次触发

```js
const { data: applicationList, refetch: listRefetch } = useQuery({
    queryKey: ["applist"],
    queryFn: async () => {
      const data = await apiApplicationList();
      return data;
    },
    placeholderData: [], // 初始化的默认值，不设置则未resolve时返回undifined
    enabled: !!id,
  });
```
#### 场景3
传递参数apiApplicationList({name:1})可主动传参

```js
const { data: applicationList, refetch: listRefetch } = useQuery({
    queryKey: ["applist"],
    queryFn: ()=> apiApplicationList({name:1}),
    enabled: false,
  });
```

#### 场景4
接口返回数据不是我需要的，也可自定义map规则，applicationList为我们处理后的数据，当然这种用法可以自定义自己请求前置的任何条件

```js
const { data: applicationList, refetch: listRefetch } = useQuery({
    queryKey: ["applist"],
    queryFn: async () => {
      const data = await apiApplicationList({});
      return data.map(((item)=>{
        return {
          ...item,
          id: item.application_id+10,
        }
      }));
    },
    enabled: false,
  });
```
#### 场景5
页面有个新增或者删除功能，操作成功后重新刷新接口，可主动触发listRefetch(),重新请求拉取数据


```js
const reload = () => {
    listRefetch();
  };
```
#### 场景6
获取请求状态，如列表加载完之前不允许任何操作，可以拿到这个接口的请求状态isPending,根据isPending可以自己的逻辑处理

```js
const { data: applicationList, refetch: listRefetch, isPending } = useQuery({
    queryKey: ["applist"],
    queryFn: ()=> apiApplicationList({name:1}),
    enabled: false,
  });
```
#### 场景7
每隔一段时间需要刷新一次接口，比如10S刷新一次列表refetchInterval可实现

```js
const { data: applicationList, refetch: listRefetch } = useQuery({
    queryKey: ["applist"],
    queryFn: () => apiApplicationList(),
     refetchInterval: 10000,
  });
```
#### 场景8
分页查询，查询条件变更则主动触发查询，避免useEffect频繁调用。我们可以借用useImmer来简化设置state, 当listParams变化后，重新自动请求接口

```js
// 初始化查询参数
  const [listParams, setListParams] = useImmer({
    kb_id: paramsQuery.kbid || "",
    file_id: paramsQuery.fileid || "",
    page_num: 1,
    page_size: 9,
    keyword: "",
  });
  // 页数切换
  const onChangePage = (page: number, pageSize: number) => {
    setListParams((draft) => {
      draft.page_num = page;
      draft.page_size = pageSize;
    });
  };
  
   // 获取列表
  const { data: chunklist, refetch: listRefetch } = useQuery({
    queryKey: ["chunklist", listParams],
    queryFn: () => apiChunkList(listParams),
  });
```




### useMutation

useMutation主要用于主动触发，如新增，删除，编辑等

#### 场景1
新增一个表单，点击确认保存，调用保存接口并刷新列表，apiApplicationAdd为请求封装，addAppmutate去了一个别名而已，后面可以调用这个isPending为请求状态

 addAppmutate(values)传递的参数，会传递给apiApplicationAdd， onSuccess回调成功刷新列表

```js
const { mutate: addAppmutate, isPending } = useMutation({
    mutationFn: apiApplicationAdd,
    onSuccess: () => {
      reload();
    },
  });
  
  
  // 新增应用
  const handelAdd = async (values: any) => {
    addAppmutate(values);
  };

```




