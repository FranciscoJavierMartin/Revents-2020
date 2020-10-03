import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface ILoadingComponentProps {
  inverted?: boolean;
  content?: string;
}

const LoadingComponent:React.FC<ILoadingComponentProps> = ({inverted = true, content='Loading...'}) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content}/>
    </Dimmer>
  )
}

export default LoadingComponent
