import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(url, { content, votes: 0})
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject)
}

export default { getAll, create, update }