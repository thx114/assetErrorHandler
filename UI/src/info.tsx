type infoType = 'error' | 'warning' | 'info' | 'success'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React from 'react';
import ReactDOM from 'react-dom';
if (!document.getElementById('infoBoxContainer')) {
    let infoBoxContainer = document.createElement("div")
    infoBoxContainer.id = 'infoBoxContainer'
    infoBoxContainer.classList.add('social-panel-layout_JFt')
    Object.assign(infoBoxContainer.style, {
        bottom: '150rem',
        left: '0rem',
        right: 'auto',
        position: 'absolute',
        zIndex: '10001',
    })

    document.body.appendChild(infoBoxContainer)
}
let UpdateInfo: Function
(() => {
    function createInfoBox(message: string, type: infoType, style: object,copy = false): Element {
        const box = document.createElement('div');
        let infosytle
        switch (type) {
            case 'error': infosytle = `background-color: rgb(244,204,204); color: rgb(175,0,0)`; break;
            case 'success': infosytle = `background-color: rgb(204,244,204); color: rgb(0,175,0)`; break;
            case 'warning': infosytle = `background-color: rgb(255, 220, 180); color: rgb(245,120,0)`; break;
            default: infosytle = `background-color: rgb(244,244,244); color: rgb(0,0,0)`; break;
        }
        
        // if(copy){
        //     message = `<input type="text" id="copyText" value="${message}">`;
        //     (window as any).UpdateInfo(message)}
        
        const divStyle = `display: flex;justify-content: center; align-items: center;`
        box.innerHTML = `<div class="content__Ej content_AD7 child-opacity-transition_nkS" style="padding:10rem;${infosytle}"><div style="${divStyle}">${message}</div></div>`
        Object.assign(box.style, {
            padding: '10rem',
            width: '400rem',
            opacity: '0',
            transform: 'scale(0.5)',
            transition: 'opacity 0.5s, transform 0.5s',
            ...style
        })
        box.classList.add('panel_YqS', 'INFOBOX')
        return box;
    }

    function displayInfo(message: string | false, type: infoType = 'info', infoStyle: object = {}, time = 5000, close = false, copy = false): void {
        const container = document.getElementById('infoBoxContainer') as any;
        if (message === false) {
            for (const i of container?.children as any) {
                i.style.opacity = '0';
                i.style.transform = 'scale(0)';
                setTimeout(() => { container.removeChild(i); }, 1000)
            }
            return
        }
        if (!container) {
            console.error('InfoBoxContainer not found');
            return;
        }
        const box = createInfoBox(message, type, infoStyle,copy) as any;
        if (close) {
            // 右上角增加关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('button_bvQ')
            closeBtn.classList.add('close-button_wKK')
            closeBtn.classList.add('close-button')
            closeBtn.style.position = 'absolute'
            closeBtn.style.top = '10rem'
            closeBtn.style.right = '10rem'
            closeBtn.style.cursor = 'pointer'
            closeBtn.innerHTML = `<div class="tinted-icon_iKo icon_PhD" style="mask-image: url(Media/Glyphs/Close.svg); "></div>`
            closeBtn.addEventListener('click', () => {
                box.style.opacity = '0';
                box.style.transform = 'scale(0)';
                setTimeout(() => { container.removeChild(box); }, 1000)
            })

            box.appendChild(closeBtn)
        }
        // if (copy != '') {
        //     (window as any).UpdateInfo('start copy')
        //     // 右上角增加复制按钮
        //     const copyBtn = document.createElement('div');
        //     ReactDOM.render((

        //         <div>
        //             <CopyToClipboard text={copy}>
        //                 <button><div className="tinted-icon_iKo icon_PhD COPYLOG" style={{ maskImage :'url(Media/Glyphs/Copy.svg)' }}></div></button>
        //             </CopyToClipboard>
        //         </div>
        //     ), container
        //     )


        //     box.appendChild(copyBtn)

        // }
        container.appendChild(box);



        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, 50);

        if (time === -1) { return }

        setTimeout(() => {
            box.style.opacity = '0';
            box.style.transform = 'scale(0)';

            setTimeout(() => { container.removeChild(box); }, 1000)

        }, time + 500);


    }
    UpdateInfo = displayInfo;
})();
(window as any).UpdateInfo = UpdateInfo;
export const loginfo = UpdateInfo

export const err = (message: string | false, time = 30000, objany = {}) => {
    const Objany = {
        infoStyle: {},
        close: false,
        copy: false,
        ...objany
    }
    UpdateInfo(message, 'error', Objany.infoStyle, time, Objany.close, Objany.copy)
}
export const warn = (message: string | false, time = 10000, objany = {}) => {
    const Objany = {
        infoStyle: {},
        close: false,
        copy: false,
        ...objany
    }
    UpdateInfo(message, 'warning', Objany.infoStyle, time, Objany.close, Objany.copy)
}
export const info = (message: string | false, time = 10000, objany = {}) => {
    const Objany = {
        infoStyle: {},
        close: false,
        copy: false,
        ...objany
    }
    UpdateInfo(message, '', Objany.infoStyle, time, Objany.close, Objany.copy)
}
export const suc = (message: string | false, time = 10000, objany = {}) => {
    const Objany = {
        infoStyle: {},
        close: false,
        copy: false,
        ...objany
    }
    UpdateInfo(message, 'success', Objany.infoStyle, time, Objany.close, Objany.copy)
}
