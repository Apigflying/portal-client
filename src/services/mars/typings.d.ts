// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

  type SetSchemaResult = {
    _id?: string;
  };

  type ResponseResult = {
    success?: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    payload?: any;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    remember?: boolean;
    code?: string;
    hex?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };
  type Captcha = {
    svg: string;
    hex: string;
  };

  type UserInfo = {
    _id?: string;
    name?: string;
    avatar?: string;
    email?: string;
    group?: string[];
    permission?: string[];
    createdAt?: string;
    isLock?: boolean;
    isSuper?: boolean;
  };

  type User = {
    _id?: string;
    name: string;
    password?: string;
    email: string;
    avatar: string;
    group?: string[];
    language?: string;
    isLock?: boolean;
  };

  type UserGroup = {
    _id: string;
    name?: string;
    access?: string[];
    createdAt?: string;
    updatedAt?: string;
    isDel?: boolean;
  };

  type Log = {
    ip?: string;
    user?: string;
    url?: string;
    action?: string;
    remark?: string;
    success?: boolean;
    reason?: string;
    createdAt?: string;
  };

  // mongoose-pagation-v2 返回的数据结构
  type PagationData<T> = {
    docs: T[];
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    limit?: number;
    nextPage?: number;
    page?: number;
    pagingCounter?: number;
    prevPage?: number;
    totalDocs: number;
    totalPages: number;
  };
  // antd pagination 需要的数据格式
  type PagationFormatted = {
    // 当前页数
    current?: number;
    // 每页条数
    pageSize?: number;
    // 数据总数
    total?: number;
  };

  type LogDistinct = {
    actionDist: string[];
    userDist: string[];
  };

  type UserGroupNameExistParams = {
    name: string;
    id?: string;
  };

  type UserNameExistParams = {
    name: string;
    id?: string;
  };

  type UserGroupAddParams = Partial<UserGroup>;

  type UserGroupEditParams = Merge<
    UserGroupAddParams,
    {
      id?: string;
    }
  >;

  //=====================接口返回结果类型=====================
  type LoginResult = Merge<
    ResponseResult,
    {
      captcha?: Captcha;
      payload?: {
        token: string;
      };
    }
  >;

  type UserInfoResult = Merge<
    ResponseResult,
    {
      payload: UserInfo;
    }
  >;
  type UserGroupResult = Merge<
    ResponseResult,
    {
      payload: UserGroup;
    }
  >;

  type UserGroupListResult = Merge<
    ResponseResult,
    {
      payload?: PagationData<UserGroup>;
    }
  >;

  type UserGroupNameExistResult = Merge<
    ResponseResult,
    {
      payload: boolean;
    }
  >;
  type UserNameExistResult = Merge<
    ResponseResult,
    {
      payload: boolean;
    }
  >;
  // 获取所有access的返回结果
  type UserPermissionResult = Merge<
    ResponseResult,
    {
      payload: string[];
    }
  >;

  // 新增/编辑 user group 返回的结果
  type UserGroupSetResult = Merge<
    ResponseResult,
    {
      payload: SetSchemaResult;
    }
  >;
  // 新增/编辑 user group 返回的结果
  type UserSetResult = Merge<
    ResponseResult,
    {
      payload: SetSchemaResult;
    }
  >;

  // 用户组详情
  type UserPermissionResult = Merge<
    ResponseResult,
    {
      payload: string[];
    }
  >;

  type LogDistinctResult = Merge<
    ResponseResult,
    {
      payload: LogDistinct;
    }
  >;

  type LogListResult = Merge<
    ResponseResult,
    {
      payload?: PagationData<Log>;
    }
  >;

  type Setting = {
    ipWhitelist: string;
    ipCheck: boolean;
  };

  type SettingResult = Merge<
    ResponseResult,
    {
      payload: SetSchemaResult;
    }
  >;
  type UserListResult = Merge<
    ResponseResult,
    {
      payload?: PagationData<UserInfo>;
    }
  >;

  // ===================================

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
