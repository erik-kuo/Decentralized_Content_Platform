import React from 'react'
import { SidebarMenu, SidebarContainer, CloseIcon, Icon, SideBtnWrap, SidebarRoute, SidebarLink, SidebarWrapper} from './SidebarElements';

const Sidebar = ({isOpen, toggle}) => {
    console.log("Sidebar",isOpen);
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/new-post" onClick={toggle}>Write a post</SidebarLink>
                    <SidebarLink to="/posts" onClick={toggle}>Personal Posts</SidebarLink>
                    <SidebarLink to="/stats" onClick={toggle}>Stats</SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
