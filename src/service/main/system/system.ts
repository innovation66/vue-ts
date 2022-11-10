import lzsRequest from '@/service'
import { IDataType } from '@/service/login/types'

export function getPageListData(url: string, queryInfo: any) {
  return lzsRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return lzsRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return lzsRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return lzsRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
