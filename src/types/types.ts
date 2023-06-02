export interface IMessage {
    title: string
    id?: string
    body: string
    from: string
    to: string
    when: string
}
export interface IState {
    username: string
    isAuth: boolean
    messagesGot: IMessage[]
    messagesSend: IMessage[]
    loader: boolean
}