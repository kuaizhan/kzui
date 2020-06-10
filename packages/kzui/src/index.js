/**
 * @description UI库组件主入口
 */
import '@kuaizhan/kedit-font';
import KZUIComponent from './components/base/index';
import GridContainer from './components/grid-container/index.tsx';
import { Row, Col } from './components/grid/index.ts';
import Button from './components/button/index.tsx';
import { Form, FormRow } from './components/form/index.tsx';
import Input from './components/input/index.tsx';
import TextArea from './components/textarea/index';
import Select, { Option } from './components/select/index.tsx';
import Icon from './components/icon/index.tsx';
import NumberInput from './components/number-input/index';
import Pager from './components/pager/index.tsx';
import RadioGroup, { Radio } from './components/radio/index';
import Switch from './components/switch/index.tsx';
import Overlay from './components/overlay/index.tsx';
import Dialog from './components/dialog/index.tsx';
import Alert from './components/alert/index.tsx';
import Steps from './components/steps/index.tsx';
import DatePicker from './components/date-picker/index';
import DateRangePicker from './components/date-range-picker/index';
import ColorPicker from './components/color-picker/index';
import Tip from './components/tip/index.tsx';
import Search from './components/search/index.tsx';
import Checkbox from './components/checkbox/index.tsx';
import types from './components/base/types';
import Table from './components/table/index.tsx';
import Tab from './components/tab/index.tsx';
import TabBar from './components/tab/TabBar.tsx';
import FileSelect from './components/file-select/index';
import Tag from './components/tag/index';
import TagSelector from './components/tag-selector/index';
import TagDynamic from './components/tag-dynamic/index';
import Confirm from './components/confirm/index.tsx';
import PopConfirm from './components/pop-confirm/index.tsx';
import Tooltip from './components/tooltip/index.tsx';
import ScrollContainer from './components/scroll-container/index.tsx';
import OperationDialog from './components/operation-dialog/index.tsx';
import TimePicker from './components/time-picker/index';
import EventBlackHole from './components/event-black-hole/index.tsx';
import SearchSelect from './components/search-select/index.tsx';
import RichTextEditor from './components/richtext-editor/index.tsx';
import Toast from './components/toast/index.tsx';
import Switcher from './components/switcher/index.tsx';
import ImageCropper from './components/image-cropper/index.tsx';
import Spin from './components/spin/index.tsx';
import Portal from './components/portal/index.tsx';
import prompt from './components/prompt/index.tsx';
import notification from './components/notification/index.tsx';
import Empty from './components/empty/index.tsx';
import './style/index.less';

const TextInput = Input;

export {
    Tab,
    TabBar,
    KZUIComponent,
    GridContainer,
    Row,
    Col,
    Button,
    Form,
    FormRow,
    Input,
    TextInput,
    TextArea,
    Select,
    Option,
    Icon,
    NumberInput,
    Pager,
    Radio,
    RadioGroup,
    Switch,
    Overlay,
    Dialog,
    Alert,
    Confirm,
    Steps,
    DatePicker,
    DateRangePicker,
    Tip,
    Search,
    Checkbox,
    types,
    Table,
    FileSelect,
    Tag,
    TagSelector,
    ColorPicker,
    PopConfirm,
    Tooltip,
    TagDynamic,
    ScrollContainer,
    OperationDialog,
    TimePicker,
    EventBlackHole,
    SearchSelect,
    RichTextEditor,
    Toast,
    Switcher,
    ImageCropper,
    Spin,
    Portal,
    prompt,
    notification,
    Empty,
};
