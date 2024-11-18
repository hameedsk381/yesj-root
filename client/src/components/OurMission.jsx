import {   Flex,  SimpleGrid } from '@mantine/core'
import CustomSection from './Program'

const OurMission = () => {
  return (
    <div>
<Flex p={'10rem'}>
    
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
      {[1,2,3,4].map((item)=>{
        return (
            <CustomSection key={item}/> 
        )
      })}
          </SimpleGrid>
</Flex>
    </div>
  )
}

export default OurMission
