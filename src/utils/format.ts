/*
 * @Author: Json Chen
 * @Date: 2022-07-29 13:46:42
 * @LastEditTime: 2022-07-29 13:46:48
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/utils/format.ts
 */
// mongoose-paginate-v2 在 server端生成的分页内容,转换成 antd 需要的分页数据
export const formatPagation = <T>(data: API.PagationData<T>): API.PagationFormatted => {
  return {
    current: data.page,
    // 每页条数
    pageSize: data.limit,
    // 数据总数
    total: data.totalDocs,
  }
}
