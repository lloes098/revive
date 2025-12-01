// 그룹 관련 유틸리티 함수들
import { createClient } from '@/lib/supabase-client'

const supabase = createClient()

export interface Group {
  id: string
  name: string
  description: string
  category: string
  member_count: number
  created_by: string
  created_at: string
  updated_at: string
}

export interface CreateGroupData {
  name: string
  description: string
  category: string
}

// 모든 그룹 가져오기
export async function getGroups(): Promise<Group[]> {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching groups:', error)
    throw error
  }
}

// 그룹 생성
export async function createGroup(groupData: CreateGroupData): Promise<Group> {
  try {
    // 현재 사용자 정보 가져오기
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const { data, error } = await supabase
      .from('groups')
      .insert({
        name: groupData.name,
        description: groupData.description,
        category: groupData.category,
        created_by: user.id,
        member_count: 1, // 생성자가 첫 번째 멤버
      })
      .select()
      .single()

    if (error) throw error

    // 그룹 생성자를 그룹 멤버로 추가
    await supabase
      .from('group_members')
      .insert({
        group_id: data.id,
        user_id: user.id,
        role: 'admin',
      })

    return data
  } catch (error: any) {
    console.error('Error creating group:', error)
    throw error
  }
}

// 그룹 가입
export async function joinGroup(groupId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    // 이미 가입되어 있는지 확인
    const { data: existing } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', groupId)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      throw new Error('이미 가입된 그룹입니다')
    }

    // 그룹 멤버로 추가
    const { error: memberError } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: user.id,
        role: 'member',
      })

    if (memberError) throw memberError

    // 그룹의 멤버 수 증가
    const { error: updateError } = await supabase.rpc('increment_group_member_count', {
      group_id: groupId,
    })

    if (updateError) {
      // RPC 함수가 없으면 직접 업데이트
      const { data: group } = await supabase
        .from('groups')
        .select('member_count')
        .eq('id', groupId)
        .single()

      if (group) {
        await supabase
          .from('groups')
          .update({ member_count: group.member_count + 1 })
          .eq('id', groupId)
      }
    }
  } catch (error: any) {
    console.error('Error joining group:', error)
    throw error
  }
}

// 사용자가 가입한 그룹 가져오기
export async function getUserGroups(userId: string): Promise<Group[]> {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        group_id,
        groups (*)
      `)
      .eq('user_id', userId)

    if (error) throw error
    return (data || []).map((item: any) => item.groups).filter(Boolean)
  } catch (error: any) {
    console.error('Error fetching user groups:', error)
    throw error
  }
}

