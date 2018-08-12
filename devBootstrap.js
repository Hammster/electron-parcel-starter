const Bundler = require('parcel')
const Path = require('path')

// Entrypoint file location
const file = Path.join(__dirname, './src/index.html')

// Bundler options
const options = {
    outDir: './app/renderer',
    outFile: 'index',
    publicUrl: './',
    watch: true,
    cache: true,
    minify: false,
    target: 'electron',
    hmrPort: 0,
    sourceMaps: true,
    hmr: true
}

async function runBundle() {
    // Initializes a bundler using the entrypoint location and options provided
    const bundler = new Bundler(file, options)

    // Run the bundler, this returns the main bundle
    // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
    const bundle = await bundler.bundle()

    // Spawn electron process once build is done.
    const spawn = require('child_process').spawn
    const pkg_manager = process.env.npm_config_user_agent.includes('yarn') ? 'yarn' : 'npm'
    const electron = spawn(process.platform === 'win32' ? `${pkg_manager}.cmd` : pkg_manager,  ['start'])
    
    electron.stdout.setEncoding('utf8')

    electron.stdout.on('data', function (data) {
      const str = data.toString()
      const lines = str.split(/(\r?\n)/g)
      console.log(lines.join(""))
    })

    electron.on('close', function (code) {
      console.log('Electron process closed: Code ' + code)
      process.exit(0)
    })
}

runBundle()