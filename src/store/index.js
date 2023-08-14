// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import batches from 'src/store/apps/batches'
import calendar from 'src/store/apps/calendar'
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import permissions from 'src/store/apps/permissions'
import schedule from 'src/store/apps/schedule'
import user from 'src/store/apps/user'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    schedule,
    batches
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
