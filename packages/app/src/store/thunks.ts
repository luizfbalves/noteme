import { supabase } from '@/services/supabaseClient'
import { createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'

import { sleep } from '@/utils'

import { UserType } from './user/user.store'

const fetchInitialNotes = createAsyncThunk('note/fectchInitialNotes',
  async () => {
    const response = await localforage.getItem('notes')

    await sleep(500)

    if (response) {
      return JSON.parse(response as string)
    }
  }
)

const fetchUserAuth = createAsyncThunk('user/fetchUserAuth',
  async () => {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (data.session) {
        const { email, user_metadata } = data.session.user

        const response: UserType = {
          email: email,
          username: user_metadata.username,
          isLogged: true,
          isLoading: false
        }
        return response
      }

      const response: UserType = {
        isLogged: false,
        isLoading: false
      }
      return response

    } catch (error) {
      const response: UserType = {
        isLogged: false,
        isLoading: false
      }
      return response
    }
  })

export { fetchInitialNotes, fetchUserAuth }
