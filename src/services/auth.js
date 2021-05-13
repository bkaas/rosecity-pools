// Gatsby auth example
// Copied file
// Ref: https://www.gatsbyjs.com/tutorial/authentication-tutorial/

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.sessionStorage.getItem("gatsbyUser")
    ? JSON.parse(window.sessionStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.sessionStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {

  // Draftee password
  if (password === `rosecity2021`) {
    return setUser({
      username: `draftee`,
    });
  }

  // Admin password
  else if (password === `rosecity2021admin`) {
    return setUser({
      username: `admin`
    });
  }

  return false
}

export const isLoggedIn = () => {
  return isDraftee() || isAdmin();
}

export const isDraftee = () => {
  const user = getUser()

  return user.username === "draftee";
}

export const isAdmin = () => {
  const user = getUser()

  return user.username === "admin"
}

export const logout = callback => {
  setUser({})
  callback()
}