import { profile } from 'console'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import { PROFILE_PAGE_ROUTE } from '../../../../../app/common/constants/routes'

interface IProfileCardProps {
  profile: any;
}

const ProfileCard: React.FC<IProfileCardProps> = ({profile}) => {
  return (
    <Card as={Link} to={`${PROFILE_PAGE_ROUTE}/${profile.id}`}>
      <Image src={profile.photoURL || '/assets/user.png'}/>
      <Card.Content>
        <Card.Header content={profile.displayName}/>
      </Card.Content>
    </Card>
  )
}

export default ProfileCard
