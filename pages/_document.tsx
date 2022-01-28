import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from '@nolmungshemung/ui-kits';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style
            id={'stitches'}
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
