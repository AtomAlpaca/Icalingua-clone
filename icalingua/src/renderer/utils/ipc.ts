import { ipcRenderer } from 'electron'
import Room from '../../types/Room'
import Message from '../../types/Message'
import Aria2Config from '../../types/Aria2Config'
import IgnoreChatInfo from '../../types/IgnoreChatInfo'
import RoamingStamp from '../../types/RoamingStamp'
import SearchableGroup from '../../types/SearchableGroup'

const ipc = {
    sendMessage(data) {
        return ipcRenderer.send('sendMessage', data)
    },
    async isOnline(): Promise<boolean> {
        return await ipcRenderer.invoke('isOnline')
    },
    async getNick(): Promise<string> {
        return await ipcRenderer.invoke('getNick')
    },
    async getAria2Settings(): Promise<Aria2Config> {
        return await ipcRenderer.invoke('getAria2Settings')
    },
    async getKeyToSendMessage(): Promise<'Enter' | 'CtrlEnter' | 'ShiftEnter'> {
        return await ipcRenderer.invoke('getKeyToSendMessage')
    },
    async getStorePath(): Promise<string> {
        return await ipcRenderer.invoke('getStorePath')
    },
    async getUin(): Promise<number> {
        return await ipcRenderer.invoke('getUin')
    },
    async fetchMessage(roomId: number, offset: number): Promise<Array<Message>> {
        return await ipcRenderer.invoke('fetchMessage', { roomId, offset })
    },
    stopFetchMessage() {
        ipcRenderer.send('stopFetchMessage')
    },
    setSelectedRoom(roomId: number, name: string) {
        ipcRenderer.send('setSelectedRoom', roomId, name)
    },
    async getAccount() {
        return await ipcRenderer.invoke('getAccount')
    },
    async getPriority() {
        return await ipcRenderer.invoke('getPriority')
    },
    //todo 这俩玩意要封装的更细的说
    async updateRoom(roomId: number, room: object) {
        return await ipcRenderer.invoke('updateRoom', roomId, room)
    },
    async updateMessage(roomId: number, messageId: string, message: object) {
        return await ipcRenderer.invoke('updateMessage', roomId, messageId, message)
    },
    async getVersion(): Promise<string> {
        return await ipcRenderer.invoke('getVersion')
    },
    download(url: string, out: string, dir?: string) {
        ipcRenderer.send('download', url, out, dir)
    },
    downloadImage(url: string) {
        ipcRenderer.send('downloadImage', url)
    },
    downloadFileByMessageData(data: { action: string; message: Message; room: Room }) {
        ipcRenderer.send('downloadFileByMessageData', data)
    },
    sendGroupPoke(gin: number, uin: number) {
        ipcRenderer.send('sendGroupPoke', gin, uin)
    },
    reLogin() {
        ipcRenderer.send('reLogin')
    },
    updatePriority(level: 1 | 2 | 3 | 4 | 5) {
        ipcRenderer.send('updatePriority', level)
    },
    popupRoomMenu(roomId: number) {
        ipcRenderer.send('popupRoomMenu', roomId)
    },
    popupAvatarMenu(message: Message, room: Room) {
        ipcRenderer.send('popupAvatarMenu', message, room)
    },
    popupTextAreaMenu() {
        ipcRenderer.send('popupTextAreaMenu')
    },
    popupStickerMenu() {
        ipcRenderer.send('popupStickerMenu')
    },
    popupStickerItemMenu(itemName: string) {
        ipcRenderer.send('popupStickerItemMenu', itemName)
    },
    popupContactMenu(remark?: string, name?: string, displayId?: number, group?: SearchableGroup) {
        ipcRenderer.send('popupContactMenu', remark, name, displayId, group)
    },
    popupMessageMenu(room: Room, message: Message, sect?: string, history?: boolean) {
        ipcRenderer.send('popupMessageMenu', room, message, sect, history)
    },
    addRoom(room: Room) {
        ipcRenderer.send('addRoom', room)
    },
    openForward(resId: string) {
        ipcRenderer.send('openForward', resId)
    },
    setAria2Config(config: Aria2Config) {
        ipcRenderer.send('setAria2Config', config)
    },
    getIgnoredChats(): Promise<IgnoreChatInfo[]> {
        return ipcRenderer.invoke('getIgnoredChats')
    },
    removeIgnoredChat(roomId: number) {
        ipcRenderer.send('removeIgnoredChat', roomId)
    },
    setLastUsedStickerType(type: 'remote' | 'stickers' | 'emojis') {
        ipcRenderer.send('setLastUsedStickerType', type)
    },
    setGroupNick(group: number, nick: string) {
        ipcRenderer.send('setGroupNick', group, nick)
    },
    async getRoamingStamp(no_cache?: boolean): Promise<RoamingStamp> {
        return await ipcRenderer.invoke('getRoamingStamp', no_cache)
    },
    async getLastUsedStickerType(): Promise<'face' | 'remote' | 'stickers' | 'emojis'> {
        return await ipcRenderer.invoke('getLastUsedStickerType')
    },
    async getSystemMsg() {
        return await ipcRenderer.invoke('getSystemMsg')
    },
    handleRequest(type: 'friend' | 'group', flag: string, accept: boolean = true): any {
        return ipcRenderer.send('handleRequest', type, flag, accept)
    },
    setGroupKick(gin: number, uin: number) {
        ipcRenderer.send('setGroupKick', gin, uin)
    },
    setGroupLeave(gin: number) {
        ipcRenderer.send('setGroupLeave', gin)
    },
    setCheckUpdate(enabled: boolean) {
        ipcRenderer.send('setCheckUpdate', enabled)
    },
    deleteMessage(roomId: number, messageId: string) {
        ipcRenderer.send('deleteMessage', roomId, messageId)
    },
    async getGroup(gin: number): Promise<SearchableGroup> {
        return await ipcRenderer.invoke('getGroup', gin)
    },
}
export default ipc
