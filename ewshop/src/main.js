import { createApp  } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
// eslint-disable-next-line no-unused-vars

import {  Image as VanImage ,Swipe, SwipeItem,Lazyload,Badge,Sidebar, SidebarItem,Collapse, CollapseItem,Tab,Tag,
        Tabs,Card ,ActionBar, ActionBarIcon, ActionBarButton,Form, Field, CellGroup,Button,SwipeCell,SubmitBar,Checkbox
        , CheckboxGroup,Stepper,Icon,AddressList ,AddressEdit  } from 'vant';

createApp(App).use(ActionBar).use(ActionBarIcon).use(ActionBarButton)
    .use(Swipe).use(SwipeItem).use(Lazyload,{
        loading:require('./assets/images/22.jpg'),

}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(Tag)
    .use(VanImage).use(Form).use(Field).use(CellGroup).use(Button).use(SwipeCell).use(SubmitBar).use(Checkbox)
    .use(CheckboxGroup).use(Stepper).use(Icon).use(AddressList).use(AddressEdit)
    .use(store).use(router).mount('#app')


