import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
    Collapse,
    Datatable,
    Datepicker,
    Dropdown,
    initTE,
    Input,
    Lightbox,
    Modal,
    Offcanvas,
    Ripple,
    Select,
    Timepicker,
    Toast,
    Tooltip,
    Validation
} from 'tw-elements';
import anime from 'animejs/lib/anime.es.js';
import { AnimeInstance } from "animejs";

@Injectable({
    providedIn: 'root',
})
export class HtmlService {
    _body!: HTMLBodyElement;
    eleCurrentScroll: { [key: string]: Array<number> } = {};
    _oldWindowWidth: number;
    _oldWindowHeight: number;
    _datatable_unique_anime_id_count: number = 0;
    private renderer!: Renderer2;
    
    
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this._oldWindowWidth = window.innerWidth;
        this._oldWindowHeight = window.innerHeight;
    }
    
    
    initTailwindElements(): void {
        initTE({
            Datatable,
            Input,
            Collapse,
            Ripple,
            Select,
            Datepicker,
            Tooltip,
            Modal,
            Toast,
            Timepicker,
            Lightbox,
            Offcanvas,
            Dropdown,
            Validation,
        }, { allowReinits: true });
    }
    
    
    body(): HTMLBodyElement {
        if (!this._body) {
            this._body = document.body as HTMLBodyElement;
        }
        return this._body;
    }
    
    
    bodyOverflowY(enable: Boolean): Boolean {
        if (enable != undefined) {
            if (enable) {
                document.body.classList.remove('overflow-y-hidden');
                return true;
            } else {
                document.body.classList.add('overflow-y-hidden');
                return false;
            }
        } else {
            return !document.body.classList.contains('overflow-y-hidden');
        }
    }
    
    
    createDataTable(
        dataTableContainer: HTMLDivElement,
        dataTableSearch: HTMLInputElement,
        columns: Array<Object>,
        rows: Array<Array<any>> | undefined = undefined,
        searchButtonsContainer: HTMLDivElement | undefined,
    ): any {
        // Inits
        let anime_id = this._datatable_unique_anime_id_count;
        this._datatable_unique_anime_id_count += 1;
        dataTableContainer.setAttribute('datatable-unique-anime-id', String(anime_id));
        let lastSearchQuery: string = '';
        let lastSelectedRow!: HTMLTableRowElement;
        
        // Init Datatable
        let dataTableInstance = new Datatable(
            dataTableContainer,
            { columns: columns, rows: rows },
            { loading: rows == undefined ? true : false, clickableRows: true }
        );
        
        // Set Animation On Rerender
        (
            dataTableContainer as any
        ).addEventListener('render.te.datatable', () => {
            anime({
                targets: `#dataTableContainer[datatable-unique-anime-id="${ anime_id }"] table tbody tr`,
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 1, duration: 170 },
                ],
                translateX: [
                    { value: 150, duration: 0 },
                    { value: 0, duration: 300 },
                ],
                easing: 'easeInOutExpo',
                delay: anime.stagger(60),
                complete: e => {},
            });
        });
        
        // Set Search Event
        let searchEvent = () => {
            let searchBtns = searchButtonsContainer?.querySelectorAll('.searchBtn') as NodeListOf<HTMLDivElement>;
            let searchColumns: Array<string> = [];
            searchBtns?.forEach((val, _, __) => {
                if (val.classList.contains('active') == true && val.hasAttribute('data-column-field')) {
                    searchColumns.push(val.getAttribute('data-column-field')!);
                }
            });
            dataTableInstance.search(dataTableSearch.value, searchColumns.length > 0 ? searchColumns : null);
        };
        dataTableSearch.addEventListener('keyup', (event: Event) => {
            if (lastSearchQuery != dataTableSearch.value) {
                lastSearchQuery = dataTableSearch.value;
                searchEvent();
            }
        });
        
        dataTableSearch.addEventListener('search', (event: Event) => {
            if (lastSearchQuery != dataTableSearch.value) {
                lastSearchQuery = dataTableSearch.value;
                searchEvent();
            }
        });
        let searchBtns = searchButtonsContainer?.querySelectorAll('.searchBtn') as NodeListOf<HTMLDivElement>;
        searchBtns?.forEach((val, _, __) => {
            val.addEventListener('click', event => {
                if (dataTableSearch.value != '') {
                    searchEvent();
                }
            });
        });
        
        // Set Previous Selected Row Bg Colored
        (
            dataTableContainer as any
        ).addEventListener('rowClick.te.datatable', (e: any) => {
            let _selectedRowIndex = e['row']['rowIndex'];
            let newlySelectedRow = dataTableContainer.querySelector(`tr[data-te-index="${ _selectedRowIndex }"]`) as HTMLTableRowElement;
            newlySelectedRow?.classList.add('bg-primary-200');
            lastSelectedRow?.classList.remove('bg-primary-200');
            lastSelectedRow = newlySelectedRow;
        });
        
        return dataTableInstance;
    }
    
    
    updateDataTable(dataTableInstance: any, rows: Array<Array<any>>): void {
        setTimeout(() => {
            dataTableInstance.update({ rows }, { loading: false });
        }, 2000);
    }
    
    
    onInView(
        element: HTMLDivElement,
        xPadding: number,
        yPadding: number,
        callback: CallableFunction,
        once: boolean
    ): void {
        let _callback = (x: number, y: number) => {
            var box = element.getBoundingClientRect();
            
            var body = document.body;
            var docEl = document.documentElement;
            
            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
            
            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;
            
            var top = Math.round(box.top + scrollTop - clientTop);
            var left = Math.round(box.left + scrollLeft - clientLeft);
            
            if (y + window.innerHeight >= top + yPadding && y <= top + element.clientHeight - yPadding) {
                callback();
            } else {
                this.onWindowScroll(_callback, '', once);
            }
        };
        var box = element.getBoundingClientRect();
        
        var body = document.body;
        var docEl = document.documentElement;
        
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        
        var top = Math.round(box.top + scrollTop - clientTop);
        var left = Math.round(box.left + scrollLeft - clientLeft);
        if (window.scrollY +
            window.innerHeight >=
            top +
            yPadding &&
            window.scrollY <=
            top +
            element.clientHeight -
            yPadding) {
            callback();
        } else {
            this.onWindowScroll(_callback, '', once);
        }
    }
    
    
    setPrintCurrentBreakPoint() {
        let printBreakPoint = () => {
            const body = document.body;
            
            const newDiv = this.renderer.createElement('div');
            
            this.renderer.setStyle(newDiv, 'position', 'fixed');
            this.renderer.setStyle(newDiv, 'top', '0');
            this.renderer.setStyle(newDiv, 'right', '0');
            this.renderer.setStyle(newDiv, 'z-index', '100');
            this.renderer.setStyle(newDiv, 'background', 'white');
            this.renderer.setStyle(newDiv, 'padding-inline', '20px');
            this.renderer.setStyle(newDiv, 'padding-block', '10px');
            this.renderer.setStyle(newDiv, 'color', 'black');
            
            const screenWidth = window.innerWidth;
            let breakPoint = '';
            if (screenWidth < 640) {
                breakPoint = 'No';
            } else if (screenWidth < 768) {
                breakPoint = 'sm';
            } else if (screenWidth < 1024) {
                breakPoint = 'md';
            } else if (screenWidth < 1280) {
                breakPoint = 'lg';
            } else if (screenWidth < 1536) {
                breakPoint = 'xl';
            } else {
                breakPoint = '2xl';
            }
            
            this.renderer.appendChild(newDiv, this.renderer.createText(breakPoint));
            this.renderer.addClass(newDiv, 'breakPointPrinter');
            
            this.renderer.appendChild(body, newDiv);
            setTimeout(() => {
                this.renderer.removeChild(body, newDiv);
            }, 60000);
        };
        window.addEventListener('resize', event => {
            printBreakPoint();
        });
        printBreakPoint();
    }
    
    
    addWindowResizeEventListener(_callback: CallableFunction, _toCallOnStartup: boolean = false) {
        window.addEventListener('resize', event => {
            _callback(window.innerHeight, window.innerWidth);
        });
        if (_toCallOnStartup) {
            _callback(window.innerHeight, window.innerWidth);
        }
    }
    
    
    addWindowWidthResizeEventListener(_callback: CallableFunction, _toCallOnStartup: boolean = false) {
        window.addEventListener('resize', event => {
            if (this._oldWindowWidth != window.innerWidth) {
                _callback(window.innerHeight, window.innerWidth);
                this._oldWindowWidth = window.innerWidth;
            }
        });
        if (_toCallOnStartup) {
            _callback(window.innerHeight, window.innerWidth);
        }
    }
    
    
    addWindowHeightResizeEventListener(_callback: CallableFunction, _toCallOnStartup: boolean = false) {
        window.addEventListener('resize', event => {
            if (this._oldWindowHeight != window.innerHeight) {
                _callback(window.innerHeight, window.innerWidth);
                this._oldWindowHeight = window.innerHeight;
            }
        });
        if (_toCallOnStartup) {
            _callback(window.innerHeight, window.innerWidth);
        }
    }
    
    
    onScroll(eleSelecter: string, func: CallableFunction, scroll: string = '') {
        console.log('Scroll Event');
        let ele = document.querySelector(eleSelecter);
        if (ele == null) {
            return;
        }
        this.eleCurrentScroll[eleSelecter] = [ele.scrollLeft, ele.scrollTop];
        ele.addEventListener('scroll', event => {
            if (ele == null) {
                return;
            }
            if (scroll == '') {
                func(ele.scrollLeft, ele.scrollTop);
            } else if (scroll == 'x') {
                if (this.eleCurrentScroll[eleSelecter][0] != ele.scrollLeft) {
                    func(ele.scrollLeft);
                }
            } else if (scroll == 'y') {
                if (this.eleCurrentScroll[eleSelecter][1] != ele.scrollTop) {
                    func(ele.scrollTop);
                }
            }
            this.eleCurrentScroll[eleSelecter][0] = ele.scrollLeft;
            this.eleCurrentScroll[eleSelecter][1] = ele.scrollLeft;
        });
    }
    
    
    onScrollX(eleSelecter: string, func: CallableFunction) {
        this.onScroll(eleSelecter, func, 'x');
    }
    
    
    onScrollY(eleSelecter: string, func: CallableFunction) {
        this.onScroll(eleSelecter, func, 'y');
    }
    
    
    onWindowScroll(func: CallableFunction, scroll: string = '', once: boolean = false) {
        let windowCurrentScroll: Array<number> = [0, 0];
        
        document.addEventListener(
            'scroll',
            event => {
                if (scroll == '') {
                    func(window.scrollX, window.scrollY);
                } else if (scroll == 'x') {
                    if (windowCurrentScroll[0] != window.scrollX) {
                        func(window.scrollX);
                    }
                } else if (scroll == 'y') {
                    if (windowCurrentScroll[1] != window.scrollY) {
                        func(window.scrollY);
                    }
                }
                windowCurrentScroll[0] = window.scrollX;
                windowCurrentScroll[1] = window.scrollY;
            },
            { once: once },
        );
    }
    
    
    onWindowScrollY(func: CallableFunction) {
        this.onWindowScroll(func, 'y');
    }
    
    
    onWindowScrollX(func: CallableFunction) {
        this.onWindowScroll(func, 'x');
    }
    
    
    scrollToTop(): void {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }
    
    
    initConsoleDeveloperDetailsLoop(): void {
        setInterval(() => {
            console.clear();
            console.error('Developer Details');
            console.info('Name: Zeeshan Nadeem');
            console.log('Contact: +923016689804');
            console.log('Email: zeeshannadeem20arid1896@gmail.com');
            console.log('Location: Gujrat Pakistan');
        }, 1000);
    }
    
    
    initFormSubmissionLoader(loader: HTMLDivElement) {
        let animation1: AnimeInstance;
        
        animation1 = anime({
            targets: loader,
            marginRight: [
                { value: '0px', duration: 0 },
                { value: '16px', duration: 800 },
            ],
            opacity: [
                { value: 0, duration: 0 },
                { value: 0, duration: 500 },
                { value: 1, duration: 300 },
            ],
            easing: 'easeInOutExpo',
        });
        
        return () => {
            if (animation1) {
                setTimeout(() => {
                    animation1.pause();
                    animation1.reverse();
                    animation1.play();
                });
            }
        }
    }
    
    
    initFormSubmissionBtnDisable(submitBtn: HTMLButtonElement) {
        let animation: AnimeInstance = anime({
            targets: submitBtn,
            opacity: [
                { value: 1, duration: 0 },
                { value: 0.5, duration: 300 },
            ],
            easing: 'easeInOutExpo',
        });
        submitBtn.disabled = true;
        
        return () => {
            animation.pause();
            animation.reverse();
            animation.play();
            submitBtn.disabled = false;
        }
    }
}
