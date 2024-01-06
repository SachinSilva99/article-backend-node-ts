export class CustomResponse<T> {
  private _status: number;
  private _message: string;
  private _data?: T;
  private _totalPages: number;

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  constructor(status: number, message: string, data?: any, totalPages?: number) {
    this._status = status;
    this._message = message;
    this._data = data;
    if (totalPages) {
      this._totalPages = totalPages;
    }else {
      this._totalPages = 0;

    }
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  toJSON() {
    return {
      status: this._status,
      message: this._message,
      data: this._data,
      pageNumbers:this._totalPages
    }
  }
}