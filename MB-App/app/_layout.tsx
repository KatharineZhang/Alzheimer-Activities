import React from 'react';
import { Tabs } from 'expo-router';

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Home"}} />
            <Tabs.Screen name="memory" options={{title: "Memory Book"}} />
            <Tabs.Screen name="faq" options={{title: "FAQ"}} />
        </Tabs>
    );
};

export default Layout;
