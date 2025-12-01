// 업사이클링 프로젝트 관련 유틸리티 함수들
import { createClient } from '@/lib/supabase-client'

const supabase = createClient()

export interface UpcycleProject {
  id: string
  image: string
  brand: string
  title: string
  progress: number
  price: string
  status: 'voting' | 'production' | 'completed'
  vote_count?: number
  created_at: string
  updated_at: string
}

export interface ProductionProject extends UpcycleProject {
  progress_text?: string
  release_date?: string
}

export interface CompletedProject extends UpcycleProject {
  completed_date?: string
}

// 투표 중인 프로젝트 가져오기
export async function getVotingProjects(): Promise<UpcycleProject[]> {
  try {
    const { data, error } = await supabase
      .from('upcycle_projects')
      .select('*')
      .eq('status', 'voting')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    // 각 프로젝트의 실제 투표 수 계산
    const projectsWithVotes = await Promise.all(
      (data || []).map(async (project: any) => {
        const { count } = await supabase
          .from('project_votes')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', project.id)
        
        return {
          ...project,
          vote_count: count || 0,
        }
      })
    )
    
    return projectsWithVotes
  } catch (error: any) {
    console.error('Error fetching voting projects:', error)
    throw error
  }
}

// 제작 중인 프로젝트 가져오기
export async function getProductionProjects(): Promise<ProductionProject[]> {
  try {
    const { data, error } = await supabase
      .from('upcycle_projects')
      .select('*')
      .eq('status', 'production')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching production projects:', error)
    throw error
  }
}

// 완료된 프로젝트 가져오기
export async function getCompletedProjects(): Promise<CompletedProject[]> {
  try {
    const { data, error } = await supabase
      .from('upcycle_projects')
      .select('*')
      .eq('status', 'completed')
      .order('completed_date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching completed projects:', error)
    throw error
  }
}

// 프로젝트에 투표하기
export async function voteForProject(projectId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    // 이미 투표했는지 확인
    const { data: existing } = await supabase
      .from('project_votes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      throw new Error('이미 투표한 프로젝트입니다')
    }

    // 투표 추가
    const { error: voteError } = await supabase
      .from('project_votes')
      .insert({
        project_id: projectId,
        user_id: user.id,
      })

    if (voteError) throw voteError

    // 투표 수는 project_votes 테이블에서 자동으로 계산되므로
    // upcycle_projects의 vote_count는 업데이트하지 않음
    // (실제 투표 수는 getVotingProjects에서 project_votes를 조인하여 계산)
  } catch (error: any) {
    console.error('Error voting for project:', error)
    throw error
  }
}

// 사용자가 투표한 프로젝트 확인
export async function hasUserVoted(projectId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return false

    const { data } = await supabase
      .from('project_votes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    return !!data
  } catch (error) {
    return false
  }
}

// 전체 투표 통계 가져오기
export async function getVotingStats(): Promise<{
  completedProjects: number
  totalVotes: number
}> {
  try {
    // 완료된 프로젝트 수 조회
    const { count: completedCount, error: completedError } = await supabase
      .from('upcycle_projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    if (completedError) {
      console.error('Error fetching completed projects:', completedError)
      throw completedError
    }

    // 전체 투표 수 조회
    const { count: votesCount, error: votesError } = await supabase
      .from('project_votes')
      .select('*', { count: 'exact', head: true })

    if (votesError) {
      console.error('Error fetching votes:', votesError)
      throw votesError
    }

    const stats = {
      completedProjects: completedCount || 0,
      totalVotes: votesCount || 0,
    }

    console.log('Fetched voting stats:', stats) // 디버깅용
    return stats
  } catch (error: any) {
    console.error('Error fetching voting stats:', error)
    return {
      completedProjects: 0,
      totalVotes: 0,
    }
  }
}

