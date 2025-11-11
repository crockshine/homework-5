import type {
  CreateTaskRequestBody,
  DeleteTaskParams,
  FetchTaskParams,
  FetchTasksQueryParams,
  PatchTaskParams,
  PatchTaskRequestBody,
  Task,
} from '@/types';
import { stringifyObject } from '@/helpers/stringifyObject';
import { BASE_URL } from '@/constants/baseUrl';

const TASK_URL: string = BASE_URL + '/tasks';

interface BaseFetchAgentProps {
  path?: string;
  errorMsg: string;
  config?: RequestInit;
}

class BaseFetchAgent {
  constructor(private readonly _apiUrl: string) {}

  async fetch<T>({ path = '', errorMsg, config = {} }: BaseFetchAgentProps): Promise<T> {
    const response = await fetch(`${this._apiUrl}${path}`, config);
    if (response.ok) {
      return await response.json();
    }
    throw { error: `${errorMsg} ${response.statusText}` };
  }
}

class FetchTaskAgent {
  constructor(private readonly _agent: BaseFetchAgent) {}

  async createTask(body: CreateTaskRequestBody): Promise<Task> {
    return await this._agent.fetch({
      errorMsg: 'Ошибка при создании задачи',
      config: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    });
  }

  async getAllTasks(params?: FetchTasksQueryParams): Promise<Task[]> {
    const queryParams = params ? '?' + new URLSearchParams(stringifyObject(params)) : '';

    return await this._agent.fetch({
      path: queryParams,
      errorMsg: 'Ошибка при получении всех задач',
    });
  }

  async getTaskById(params: FetchTaskParams): Promise<Task> {
    return await this._agent.fetch({
      path: `/${params.id}`,
      errorMsg: `Ошибка при получении задачи с id = ${params.id}`,
    });
  }

  async updateTaskById(params: PatchTaskParams, updatedTask: PatchTaskRequestBody): Promise<Task> {
    return await this._agent.fetch({
      path: `/${params.id}`,
      errorMsg: `Ошибка при обновлении задачи с id = ${params.id}`,
      config: {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      },
    });
  }

  async deleteTaskById(params: DeleteTaskParams): Promise<Task> {
    return await this._agent.fetch({
      path: `/${params.id}`,
      errorMsg: `Ошибка при удалении задачи с id = ${params.id}`,
      config: {
        method: 'DELETE',
      },
    });
  }
}

const baseFetchAgent = new BaseFetchAgent(TASK_URL);
export const fetchTaskAgent = new FetchTaskAgent(baseFetchAgent);
