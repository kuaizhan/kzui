/**
 * @description UI库组件主入口
 */
import '@kuaizhan/kedit-font';
import KZUIComponent from './components/base/component';
import GridContainer from './components/grid-container/index';
import { Row, Col } from './components/grid/index';
import Button from './components/button/index';
import { Form, FormRow } from './components/form/index';
import Input from './components/input/index';
import TextArea from './components/textarea/index';
import Select, { Option } from './components/select/index';
import Icon from './components/icon/index';
import NumberInput from './components/number-input/index';
import Pager from './components/pager/index';
import RadioGroup, { Radio } from './components/radio/index';
import Switch from './components/switch/index';
import Overlay from './components/overlay/index';
import Dialog from './components/dialog/index';
import Alert from './components/alert/index';
import Steps from './components/steps/index';
import DatePicker from './components/date-picker/index';
import DateRangePicker from './components/date-range-picker/index';
import ColorPicker from './components/color-picker/index';
import Tip from './components/tip/index';
import Search from './components/search/index';
import Checkbox from './components/checkbox/index';
import types from './components/base/types';
import Table from './components/table/index';
import Tab from './components/tab/index';
import TabBar from './components/tab/TabBar';
import FileSelect from './components/file-select/index';
import Tag from './components/tag/index';
import TagSelector from './components/tag-selector/index';
import Confirm from './components/confirm/index';
import PopConfirm from './components/pop-confirm/index';
import Tooltip from './components/tooltip/index';
import ScrollContainer from './components/scroll-container/index';
import OperationDialog from './components/operation-dialog/index';
import TimePicker from './components/time-picker/index';
import EventBlackHole from './components/event-black-hole/index';
import SearchSelect from './components/search-select/index';
import RichTextEditor from './components/richtext-editor/index';
import Toast from './components/toast/index';
import Switcher from './components/switcher/index';
import ImageCropper from './components/image-cropper/index';
import Spin from './components/spin/index';
import Portal from './components/portal/index';
import prompt from './components/prompt/index';
import notification from './components/notification/index';
import Empty from './components/empty/index';
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
