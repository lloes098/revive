interface MyIconProps {
  color?: string
}

export default function MyIcon({ color = '#6B6B6B' }: MyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_31_1217)">
        <path 
          d="M9.99999 18.3332C14.6024 18.3332 18.3333 14.6022 18.3333 9.99984C18.3333 5.39746 14.6024 1.6665 9.99999 1.6665C5.39762 1.6665 1.66666 5.39746 1.66666 9.99984C1.66666 14.6022 5.39762 18.3332 9.99999 18.3332Z" 
          stroke={color} 
          strokeWidth="1.66667" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M10 10.8335C11.3807 10.8335 12.5 9.71421 12.5 8.3335C12.5 6.95278 11.3807 5.8335 10 5.8335C8.61929 5.8335 7.5 6.95278 7.5 8.3335C7.5 9.71421 8.61929 10.8335 10 10.8335Z" 
          stroke={color} 
          strokeWidth="1.66667" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M5.83334 17.2182V15.8332C5.83334 15.3911 6.00894 14.9672 6.3215 14.6547C6.63406 14.3421 7.05798 14.1665 7.50001 14.1665H12.5C12.942 14.1665 13.366 14.3421 13.6785 14.6547C13.9911 14.9672 14.1667 15.3911 14.1667 15.8332V17.2182" 
          stroke={color} 
          strokeWidth="1.66667" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_31_1217">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}




