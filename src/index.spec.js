import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import nuxtDevReady from 'nuxt-dev-ready'
import kill from 'tree-kill-promise'

export default tester(
  {
    async 'not valid'() {
      await fs.outputFile(
        'pages/index.vue',
        endent`
          <template>
            <form :class="{ sent }" @submit.prevent="submit">
              <self ref="honeypot" class="self" />
              <button type="submit" />
            </form>
          </template>

          <script setup>
          import { ref } from 'vue'

          import Self from '../../src/index.vue'

          const sent = ref()
          const honeypot = ref()

          const submit = () => {
            honeypot.value.validate()
            sent.value = true
          }
          </script>
        `,
      )

      const nuxt = execaCommand('nuxt dev')
      try {
        await nuxtDevReady()
        await this.page.goto('http://localhost:3000')

        const self = await this.page.$('.self')
        await self.type('foo')

        const submitButton = await this.page.waitForSelector(
          'button[type=submit]',
        )
        await submitButton.click()

        const form = await this.page.$('form')
        expect(
          await form.evaluate(el => el.classList.contains('sent')),
        ).toEqual(false)
      } finally {
        await kill(nuxt.pid)
      }
    },
    async valid() {
      await fs.outputFile(
        'pages/index.vue',
        endent`
          <template>
            <form :class="{ sent }" @submit.prevent="submit">
              <self ref="honeypot" />
              <button type="submit" />
            </form>
          </template>

          <script setup>
          import { ref } from 'vue'

          import Self from '../../src/index.vue'

          const sent = ref()
          const honeypot = ref()

          const submit = () => {
            honeypot.value.validate()
            sent.value = true
          }
          </script>
        `,
      )

      const nuxt = execaCommand('nuxt dev')
      try {
        await nuxtDevReady()
        await this.page.goto('http://localhost:3000')

        const submitButton = await this.page.$('button[type=submit]')
        await submitButton.click()

        const form = await this.page.$('form')
        expect(
          await form.evaluate(el => el.classList.contains('sent')),
        ).toEqual(true)
      } finally {
        await kill(nuxt.pid)
      }
    },
  },
  [testerPluginTmpDir(), testerPluginPuppeteer()],
)
