import react from 'react';
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Button, Tabs, Avatar, Tooltip, Modal, Input, Switch, theme } from 'antd'
import { Excalidraw } from '@excalidraw/excalidraw'
import {
    Video, Phone, Users, Settings, Share2, Monitor,
    MessageSquare, Lock, Eraser, MousePointer2,
    Square, Circle, Type, Image, Download, ChevronLeft,
    ChevronRight, Copy, Edit, Eye
} from 'lucide-react'
import ParticipantsPanel from '../components/WhiteBoard/ParticipantsPanel'
import VideoCall from '../components/WhiteBoard/VideoCall'
import { useSocket } from '../hooks/useSocket'

const { Header, Sider, Content } = Layout
const { TabPane } = Tabs
const { useToken } = theme

export default function WhiteboardPage() {
    const { token } = useToken()
    const { roomId } = useParams()
    const navigate = useNavigate()
    const excalidrawRef = useRef(null)
    const [activeTab, setActiveTab] = useState('elements')
    const [whiteboardElements, setWhiteboardElements] = useState([])
    const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)
    const [participants, setParticipants] = useState([])
    const [isToolbarOpen, setIsToolbarOpen] = useState(true)
    const [shareModalVisible, setShareModalVisible] = useState(false)
    const [initialized, setInitialized] = useState(false);

    const [roomSettings, setRoomSettings] = useState({
        isPublic: true,
        allowEditing: true
    })
    const socket = useSocket(roomId)

    useEffect(() => {
        if (!socket) return

        // Initialize room data
        socket.on('init-room', (roomData) => {
            setWhiteboardElements(roomData.elements);
            setParticipants(roomData.participants);
            setRoomSettings(roomData.settings);
            setInitialized(true);

            // Update Excalidraw view mode if needed
            if (!roomData.settings.allowEditing && excalidrawRef.current) {
                excalidrawRef.current.updateScene({
                    elements: roomData.elements,
                    appState: { viewModeEnabled: true }
                });
            }
        });


        // Whiteboard collaboration
        socket.on('elements-update', (elements) => {
            setWhiteboardElements(elements)
        })

        // Participants management
        socket.on('participants-updated', (users) => {
            setParticipants(users)
        })

        // Room settings updates
        socket.on('room-settings-updated', (settings) => {
            setRoomSettings(settings)
            if (!settings.allowEditing) {
                excalidrawRef.current?.updateScene({
                    elements: whiteboardElements,
                    appState: { viewModeEnabled: true }
                })
            }
        })

        // Initial room settings
        socket.emit('get-room-settings')


        return () => {
            socket.off('init-room');
            socket.off('elements-update');
            socket.off('participants-updated');
            socket.off('room-settings-updated');
            socket.disconnect();
        };
    }, [socket])

    // Update the handleWhiteboardChange function
    const handleWhiteboardChange = (elements) => {
        if (roomSettings.allowEditing && initialized) {
            socket.emit('elements-changed', elements);
            setWhiteboardElements(elements);
        }
    };

    const copyRoomLink = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    const handleShareSettings = () => {
        socket.emit('update-room-settings', roomSettings)
        setShareModalVisible(false)
    }

    const setActiveTool = (toolType) => {
        if (excalidrawRef.current) {
            excalidrawRef.current.updateScene({
                appState: {
                    currentItemType: toolType
                }
            });
        }
    };

    const clearCanvas = () => {
        if (excalidrawRef.current) {
            excalidrawRef.current.resetScene();
            socket.emit('elements-changed', []);
        }
    };

    // In your WhiteboardPage component
    const excalidrawComponent = (
        <Excalidraw
            ref={excalidrawRef}
            initialData={{ elements: whiteboardElements }}
            onChange={handleWhiteboardChange}
            theme="light"
            viewModeEnabled={!roomSettings.allowEditing}
            UIOptions={{
                canvasActions: {
                    toggleTheme: false,
                    saveToActiveFile: false,
                    loadScene: false,
                },
                // Hide default toolbar since you have your own
                toolBar: {
                    hidden: true
                }
            }}
            className="rounded-xl"
        />
    );
    return (
        <Layout className="h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <Header className="flex items-center justify-between px-6 shadow-lg"
                style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    border: 'none',
                    height: '64px'
                }}>
                <div className="flex items-center gap-4">
                    <Button
                        type="text"
                        icon={<Monitor size={20} className="text-white" />}
                        onClick={() => navigate('/')}
                        className="hover:bg-white/10 rounded-lg"
                    />
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">Room: {roomId}</span>
                        <Tooltip title="Share room">
                            <Button
                                shape="circle"
                                icon={<Share2 size={16} className="text-white" />}
                                onClick={() => setShareModalVisible(true)}
                                className="hover:bg-white/20 border-white/20"
                            />
                        </Tooltip>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Avatar.Group className="flex items-center gap-2">
                        {participants.map(p => (
                            <Tooltip key={p.id} title={p.name}>
                                <Avatar
                                    style={{
                                        backgroundColor: p.color,
                                        border: '2px solid white',
                                        boxShadow: token.boxShadow
                                    }}
                                    className="transition-transform hover:scale-110"
                                >
                                    {p.name[0]}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>

                    <Button.Group className="space-x-2">
                        <Button
                            type="primary"
                            icon={<Video size={18} />}
                            onClick={() => navigate('/createcall')}
                            className="bg-violet-500 hover:bg-violet-600 border-none rounded-lg"
                            shape="round"
                        >
                            Olabs Meet
                        </Button>
                    </Button.Group>
                </div>
            </Header>

            {/* Share Modal */}
            <Modal
                title="Share Whiteboard"
                open={shareModalVisible}
                onCancel={() => setShareModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShareModalVisible(false)}>
                        Close
                    </Button>,
                    <Button
                        key="save"
                        type="primary"
                        onClick={handleShareSettings}
                    >
                        Save Settings
                    </Button>
                ]}
                className="rounded-lg"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            value={window.location.href}
                            readOnly
                            className="flex-1"
                        />
                        <Button
                            icon={<Copy size={16} />}
                            onClick={copyRoomLink}
                        >
                            Copy
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Eye size={16} />
                                Public Room
                            </span>
                            <Switch
                                checked={roomSettings.isPublic}
                                onChange={(checked) => setRoomSettings(prev => ({
                                    ...prev,
                                    isPublic: checked
                                }))}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Edit size={16} />
                                Allow Editing
                            </span>
                            <Switch
                                checked={roomSettings.allowEditing}
                                onChange={(checked) => setRoomSettings(prev => ({
                                    ...prev,
                                    allowEditing: checked
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            <Layout className="bg-transparent">

                <Content className="bg-transparent pr-2 pb-2">
                    <div className="h-[calc(100vh-80px)] rounded-xl shadow-xl overflow-hidden bg-white">
                        {excalidrawComponent}
                    </div>
                </Content>
            </Layout>

            <VideoCall
                visible={isVideoCallOpen}
                roomId={roomId}
                onClose={() => setIsVideoCallOpen(false)}
                socket={socket}
                className="rounded-xl"
            />
        </Layout>
    )
}