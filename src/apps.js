const apps = []
let files = require.context('../', true, /(\.\/public\/img\/[a-z0-9_-]+)\.png$/i)
let icons = files.keys().map(path => {
  return path.replace('./public/img/', '')
})
console.log(icons)
for (let i = 0; i < icons.length; i++) {
  apps.push({
    id: Math.random(),
    name: icons[i].replace('.png', ''),
    icon: icons[i]
  })
}

export default apps
