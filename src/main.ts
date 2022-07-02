import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// ----- css & primeVue css -----
import './styles/index.css'
import.meta.env.MODE === 'development' && import('../src/styles/light.css')
// import.meta.env.MODE === 'development' && import('../src/styles/dark.css')
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// ----- primeVue components -----
import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'
import Image from 'primevue/image'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb'
import Message from 'primevue/message'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'
import Row from 'primevue/row'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import ColumnGroup from 'primevue/columngroup'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// ----- use hooks -----
import useVariables from './hooks/variable'
const { locale } = useVariables()

// ----- create app -----
const app = createApp(App)

// ----- app use -----
app.use(router)
app.use(createPinia())
app.use(PrimeVue, { locale: { ...locale } })
app.use(ToastService)
app.use(ConfirmationService)

// ----- ues primeVue components -----
app.component('Menu', Menu)
app.component('Image', Image)
app.component('Button', Button)
app.component('Sidebar', Sidebar)
app.component('InputText', InputText)
app.component('Breadcrumb', Breadcrumb)
app.component('Message', Message)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('Skeleton', Skeleton)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Tag', Tag)
app.component('Row', Row)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('ColumnGroup', ColumnGroup)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app')
