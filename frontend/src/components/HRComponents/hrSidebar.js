import React, { useState } from "react";
import { Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

const SidebarExampleVisible = (props) => {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [animation, setAnimation] = useState("push");

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        vertical
        visible={true}
        width="thin"
      >
        <Menu.Item
          as="a"
          onClick={() => {
            setVisible2(true);
          }}
        >
          <Icon name="home" />
          Interview
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="gamepad" />
          Jobs
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="camera" />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          direction="left"
          visible={visible2}
          width="thin"
        >
          <Menu.Item
            as="a"
            href="/hr/interviews/schedule"
            onClick={() => {
              setVisible2(false);
            }}
          >
            <Icon name="home" />
            Schedule Interviews
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Pending Interviews
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SidebarExampleVisible;
