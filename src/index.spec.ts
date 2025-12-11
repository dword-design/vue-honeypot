import pathLib from 'node:path';

import { waitForHydration } from '@nuxt/test-utils/e2e';
import { expect, test } from '@playwright/test';
import endent from 'endent';
import { execaCommand } from 'execa';
import fs from 'fs-extra';
import getPort from 'get-port';
import nuxtDevReady from 'nuxt-dev-ready';
import kill from 'tree-kill-promise';

test('not valid', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await fs.outputFile(
    pathLib.join(cwd, 'app', 'pages', 'index.vue'),
    endent`
      <template>
        <form :class="{ sent }" @submit.prevent="submit">
          <self ref="honeypot" class="self" />
          <button type="submit" />
        </form>
      </template>

      <script setup lang="ts">
      import { ref, useTemplateRef } from 'vue'

      import Self from '@@/../../src/index.vue';

      const sent = ref(false);
      const honeypot = useTemplateRef('honeypot');

      const submit = () => {
        honeypot.value.validate();
        sent.value = true;
      };
      </script>
    `,
  );

  const port = await getPort();
  const nuxt = execaCommand('nuxt dev', { cwd, env: { PORT: String(port) } });

  try {
    await nuxtDevReady(port);
    await page.goto(`http://localhost:${port}`);
    await waitForHydration(page, '', 'hydration');
    await page.locator('.self').getByRole('textbox').fill('foo');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('form')).not.toContainClass('sent');
  } finally {
    await kill(nuxt.pid!);
  }
});

test('valid', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await fs.outputFile(
    pathLib.join(cwd, 'app', 'pages', 'index.vue'),
    endent`
      <template>
        <form :class="{ sent }" @submit.prevent="submit">
          <self ref="honeypot" />
          <button type="submit">Submit</button>
        </form>
      </template>

      <script setup lang="ts">
      import { ref, useTemplateRef } from 'vue';

      import Self from '@@/../../src/index.vue';

      const sent = ref(false);
      const honeypot = useTemplateRef('honeypot');

      const submit = () => {
        honeypot.value.validate();
        sent.value = true;
      };
      </script>
    `,
  );

  const port = await getPort();
  const nuxt = execaCommand('nuxt dev', { cwd, env: { PORT: String(port) } });

  try {
    await nuxtDevReady(port);
    await page.goto(`http://localhost:${port}`);
    await waitForHydration(page, '', 'hydration');
    await page.locator('button[type=submit]').click();
    await expect(page.locator('form')).toContainClass('sent');
  } finally {
    await kill(nuxt.pid!);
  }
});
