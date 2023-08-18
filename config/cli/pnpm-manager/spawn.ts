import { spawn } from "child_process"
import { lookpath } from "./utils/lookPath.js"

const pnpmSpawn = async (
  args: string[],
  opts?: {
    cwd?: string,
    env?: NodeJS.ProcessEnv,
  },
) => {
  opts = opts || {}
  const cwd = opts.cwd || process.cwd()
  const env = opts.env || process.env
  try {
    await lookpath('pnpm')
    await pnpmExec({
      args,
      cwd,
      env,
    })
  } catch (err) {
    // An error means that pnpm does not exist
    // so lets' install it
    await pnpmExec({
      args: ['node', require.resolve('pnpm/bin/pnpm.cjs'), ...args],
      cwd,
      env,
    })
  }
}

async function pnpmExec (
  opts: {
    args: string[],
    cwd: string,
    env: NodeJS.ProcessEnv,
  },
) {
  return new Promise((resolve, reject) => {
    const proc = spawn('pnpm', opts.args, {
      cwd: opts.cwd,
      env: opts.env,
      stdio: 'inherit',
    })

    proc.on('error', reject)

    proc.on('close', (code: number) => {
      if (code > 0) {
        return reject(new Error(`Exit code: ${code}`))
      }
      return resolve(1);
    })
  })
};

export default pnpmSpawn;