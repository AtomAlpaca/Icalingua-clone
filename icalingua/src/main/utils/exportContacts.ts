import getFriends from './getFriends'
import errorHandler from './errorHandler'
import { getFriendsFallback, getGroups } from '../ipc/botAndStorage'
import writeCsvData from './writeCsvData'
import { getMainWindow } from './windowManager'
import { app, dialog } from 'electron'
import path from 'path'
import formatDate from '../../utils/formatDate'
import ui from './ui'

export default async (type: 'friend' | 'group') => {
    const savePath = dialog.showSaveDialogSync(getMainWindow(), {
        title: '请选择保存位置',
        defaultPath: path.join(app.getPath('desktop'), formatDate('yyyy-MM-dd') + '.csv'),
        filters: [
            {
                name: 'Comma-separated values (CSV)',
                extensions: ['csv'],
            },
        ],
    })
    if (!savePath) return
    const exportFunc = type === 'friend' ? exportFriendsAsCsv : exportGroupsAsCsv
    try {
        if (await exportFunc(savePath)) ui.messageSuccess('导出成功')
        else ui.messageError('导出失败')
    } catch (e) {
        errorHandler(e, true)
        ui.messageError(`导出失败: ${e}`)
    }
}

//region 好友
const friendsHeader: Array<{ id: string; title: string }> = [
    { id: 'group', title: '分组' },
    { id: 'uin', title: '帐号' },
    { id: 'nick', title: '昵称' },
    { id: 'remark', title: '备注' },
]
type FriendExport = {
    group: string
    uin: number
    nick: string
    remark: string
}

const exportFriendsAsCsv = async (savePath: string) => {
    const friendsExport: FriendExport[] = []
    try {
        //可获取含分组的好友
        const friendsRaw = await getFriends()
        for (const g of friendsRaw) {
            for (const f of g.friends) {
                friendsExport.push({
                    group: g.name,
                    uin: f.uin,
                    nick: f.nick,
                    remark: f.remark,
                })
            }
        }
    } catch (e) {
        //获取含分组好友失败
        errorHandler(e, true)
        const friendsRaw = await getFriendsFallback()
        for (const f of friendsRaw) {
            friendsExport.push({
                group: '获取失败',
                uin: f.uin,
                nick: f.nick,
                remark: f.remark,
            })
        }
    }
    //写出 csv
    return await writeCsvData(friendsHeader, friendsExport, savePath)
}
//endregion

//region 群
const groupsHeader: Array<{ id: string; title: string }> = [
    { id: 'gin', title: '群号' },
    { id: 'name', title: '名称' },
    { id: 'memberCount', title: '成员数' },
    { id: 'joinTime', title: '加入时间' },
    { id: 'owner', title: '群主' },
]
type groupExport = {
    gin: number
    name: string
    memberCount: number
    joinTime: string
    owner: number
}

const exportGroupsAsCsv = async (savePath: string) => {
    const groupsExport: groupExport[] = []
    const groupsRaw = await getGroups()
    for (const g of groupsRaw) {
        groupsExport.push({
            gin: g.group_id,
            name: g.group_name,
            memberCount: g.member_count,
            owner: g.owner_id,
            joinTime: formatDate('yyyy-MM-dd', new Date(g.last_join_time * 1000)),
        })
    }
    //写出 csv
    return await writeCsvData(groupsHeader, groupsExport, savePath)
}
//endregion
