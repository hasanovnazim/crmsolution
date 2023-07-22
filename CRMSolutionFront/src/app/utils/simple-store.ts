import { BehaviorSubject, Observable } from "rxjs";

export class SimpleStore<T> {
  private _state: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
    this.state$ = this._state.asObservable();
  }

  public state$: Observable<T>;

  public set state(value: T) {
    this._state.next(value);
  }

  public get state() {
    return this._state.value;
  }

  saveToLocalStorage(key: string) {
    localStorage.setItem(key, JSON.stringify(this.state));
  }
}
