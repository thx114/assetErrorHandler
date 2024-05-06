import { delay, on, rif } from "RIF";
import { err, info, suc } from "./info";

//import ReactDOMServer from 'react-dom/server';

console.log('assetErrorHandler loaded')
async function errorHandler() {
    document.head.appendChild(document.createElement('style')).innerHTML = `

    .close-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 10rem;
      height: 10rem;
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1;
    }
    .close-button::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10rem 10rem 0;
      border-color: transparent #000 transparent transparent;
      top: 0;
      right: 0;
    }
  `
    const errmsg = document.querySelector('.error-message_r4_')?.textContent;
    if (errmsg === 'Object reference not set to an instance of an object') {
        //info('Handled a meaningless error.', 2000)
        rif().class('buttons_lZi.row_L6K').first.click
        await delay(100)
        errorHandler()
    }
    else if (errmsg === 'Data layout mismatch; skipping past array boundary when exiting node.') {
        //info('Handled a meaningless error.', 2000)
        rif().class('buttons_lZi.row_L6K').first.click
        await delay(100)
        errorHandler()
    }
    else if (errmsg?.includes('Data dump: Json: {')) {
        info('Handled a asset error.', 1500)
        rif().class('buttons_lZi.row_L6K').first.click;
        const logMsg = (() => {
            let meg = document.querySelector('.paragraphs_nbD')
            let AssetName = ''
            let AssetType = ''
            let AssetDepend = []

            if (!meg) return;

            for (const item of meg.children) {

                const itemText = item.textContent
                if (itemText?.includes('$type": "0|')) {
                    const regex = /"\$type": "0\|(.*?)"/;
                    const match = itemText.match(regex);
                    if (match) {
                        AssetType = match[1]
                        .replace('Game.Prefabs.', '')
                        .replace(', Game', '')
                        console.log(itemText)
                    }
                } else if (itemText?.includes('name": "')) {
                    const regex = /"name": "(.*?)"/;
                    const match = itemText.match(regex);
                    if (match && AssetName === '') {
                        AssetName = match[1]
                        console.log(itemText)
                    }
                } else if (itemText?.includes('$fstrref')) {
                    const regex = /"CID:([^"]*)"/;
                    const match = itemText.match(regex);
                    if (match) AssetDepend.push(match[1]);
                    if (match) console.log(itemText)
                }
            }

            const fullmsg = Array.from(meg.children).map(i => i.textContent).join('\n')
            AssetDepend = Array.from(new Set(AssetDepend))

            return [`
                <div style="">
                    <p>PreFab Json Loading Error</p>
                    <p>PreFab Name:<input type="text" id="copyText" value="${AssetName}" readonly style="border: none; outline: none; background: none; font-size: inherit; cursor: pointer; width: 50%;"/></p>
                    <p>PreFab Type:<input type="text" id="copyText" value="${AssetType}" readonly style="border: none; outline: none; background: none; font-size: inherit; cursor: pointer; width: 50%;"/></p>
                    <p>PreFab Depend:<input type="text" id="copyText" value="${AssetDepend.length}" readonly style="border: none; outline: none; background: none; font-size: inherit; cursor: pointer; width: 50%;"/></p>
                    <input type="text" id="copyText" value="${AssetDepend.join('\n')}" readonly style="border: none; outline: none; background: none; font-size: inherit; cursor: pointer; width: 100%;"/>
                    <div class>
                    </button>
                </div>
                `, fullmsg]

            // 去掉文本头尾空格


        })()
        if (!logMsg) return;
        err(logMsg[0], -1, { close: true, copy: true })
        await delay(200)
        rif().class('COPYLOG').items.forEach(item => {
            item.classList.remove('COPYLOG')

        })

        await delay(100)
        //errorHandler()
    }
    else if (errmsg?.includes('Was not in array when exiting array.')) {
        info('Handled a meaningless error.', 2000)
        rif().class('buttons_lZi.row_L6K').first.click
        await delay(100)
        errorHandler()
    }


}
export const load = () => {
    (async function AssetErrorHandler() {
        console.log('on load')


        const StartTime = Date.now();
        let Off = false;

        while ((Date.now() - StartTime < 90000) && !Off) {
            await delay(500)
            if (on.Game || on.Editor || on.Error) Off = true;
            console.log('waiting for game to load')
        }
        await delay(1000)
        console.log('into next')

        if (!document.querySelector('.error-dialog_iaV')) return;
        console.log('into errorHandler')
        errorHandler()
    })()

    return null;
}