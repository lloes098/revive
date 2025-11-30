'use client'

import FeedPost from './FeedPost'
import styles from './FeedTab.module.css'

const defaultPosts = [
  {
    id: '1',
    profileIcon: '😊',
    username: '빈티지러버',
    timeAgo: '2시간 전',
    content: '오늘 홍대에서 득템한 90년대 리바이스! 너무 마음에 들어요 💙',
    hashtags: ['#90s데님', '#리바이스', '#홍대빈티지'],
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop'],
    likes: 124,
    comments: 18,
  },
  {
    id: '2',
    profileIcon: '👑',
    username: '레트로퀸',
    timeAgo: '5시간 전',
    content: 'Y2K 코디 완성! 어떤가요? 🦋✨',
    hashtags: ['#Y2K', '#코디추천', '#버터플라이'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'
    ],
    likes: 287,
    comments: 45,
  },
]

export default function FeedTab() {
  return (
    <div className={styles.container}>
      {defaultPosts.map((post) => (
        <FeedPost
          key={post.id}
          profileIcon={post.profileIcon}
          username={post.username}
          timeAgo={post.timeAgo}
          content={post.content}
          hashtags={post.hashtags}
          images={post.images}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  )
}


