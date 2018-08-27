let files = require.context('../', true, /(\.\/public\/img\/[a-z0-9_-]+)\.png$/i)

let apps = files.keys().map((path, i) => {
  let iconPath = path.replace('./public', '')
  return {
    id: Math.random().toString(16).substr(2),
    order: i,
    name: iconPath.replace('.png', '').replace('/img/', '').replace('-', ' '),
    icon: iconPath
  }
})

export default apps
