import React, {useRef, useEffect} from 'react'
import tw, {styled} from 'twin.macro'
import twemoji from 'twemoji'
import moment from 'moment'

const TwitterCard = styled.div`
  ${tw`p-3`}
  background: #15202B;
  border: 2px solid #313B45;
  border-radius: 10px;
  font-family: "Segoe UI";
`

const TwitterUser = styled.div`
  ${tw`flex items-center mb-2`}
  font-weight: bold;
`

const TwitterAvatar = styled.img`
  ${tw`rounded-full h-11 w-11`}
`

const TwitterUserContent = styled.div`
  ${tw`flex flex-col ml-4`}
`

const TwitterUsername = styled.span`
  color: #8899A6;
  font-weight: 400;
`

const TwitterMedia = styled.img`
  ${tw`rounded-md max-w-full mt-4 flex`}
`

const TwitterFooter = styled.span`
  ${tw`mt-2 flex`}
  color: #8899A6;
  font-weight: 400;
`

const TwitterFooterItem = styled.a`

`

export function TwitterPost({
                              user,
                              image,
                              footer,
                              children
                            }) {
  const textRef = useRef(null)

  const getDate = () => moment(footer.date).format('H:mm [·] MMM D, YYYY')

  useEffect(() => {
    console.log(textRef)
    if (textRef) {
      twemoji.parse(textRef.current, {
        className: 'twemoji-item',
        ext: '.svg',
        size: 'svg'
      })
    }
  }, [textRef, children])

  return <TwitterCard>
    <TwitterUser>
      <TwitterAvatar src={user.avatar} alt={user.name}/>
      <TwitterUserContent>
        {user.name}
        <TwitterUsername>
          @{user.user}
        </TwitterUsername>
      </TwitterUserContent>
    </TwitterUser>
    <div ref={textRef}>
      {children}
    </div>
    {
      image && <TwitterMedia src={image} alt="Twitter media sample"/>
    }
    {
      footer && <TwitterFooter>
        <TwitterFooterItem>
          {getDate()}
        </TwitterFooterItem>
        <span style={{
          marginLeft: 4,
          marginRight: 4
        }}>·</span>
        <TwitterFooterItem>
          {footer.app}
        </TwitterFooterItem>
      </TwitterFooter>
    }
  </TwitterCard>
}