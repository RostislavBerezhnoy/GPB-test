import { BackButton } from 'components/BackButton'
import { Box } from 'components/Box'
import { EventCard } from './components/EventCard'

export const Test3CreateEvent = () => (
  <Box>
    <Box marginBottom={10}>
      <BackButton />
    </Box>
    <EventCard />
  </Box>
)
