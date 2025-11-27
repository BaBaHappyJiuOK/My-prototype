// 端到端智能运维系统 - 增强版 JavaScript

// 全局状态管理
const AppState = {
    currentPage: 'home',
    userData: {
        name: '张三',
        role: '运维工程师',
        department: '网络运维部'
    },
    notifications: [
        { id: 1, type: 'alarm', title: '新增紧急故障告警', time: '5分钟前' },
        { id: 2, type: 'workorder', title: '工单 #WO20231124001 已分配', time: '10分钟前' },
        { id: 3, type: 'system', title: '系统维护通知', time: '1小时前' },
        { id: 4, type: 'report', title: '性能监控报告已生成', time: '2小时前' },
        { id: 5, type: 'resolved', title: '群障事件已解决', time: '3小时前' }
    ]
};

// 页面内容定义
const PageContents = {
    home: () => `
        <div class="page-content">
            <div class="function-cards">
                <div class="function-card" onclick="navigateTo('diagnosis')">
                    <div class="card-icon">🔍</div>
                    <h3>智能故障诊断</h3>
                    <p>端到端链路分析，AI智能诊断，快速定位故障根因</p>
                </div>
                <div class="function-card" onclick="navigateTo('topology')">
                    <div class="card-icon">🌐</div>
                    <h3>网络拓扑可视化</h3>
                    <p>实时网络拓扑图，设备状态监控，链路质量分析</p>
                </div>
                <div class="function-card" onclick="navigateTo('performance')">
                    <div class="card-icon">📊</div>
                    <h3>性能监控</h3>
                    <p>基础性能指标监控，实时数据展示，告警阈值管理</p>
                </div>
                <div class="function-card" onclick="navigateTo('monitor')">
                    <div class="card-icon">📺</div>
                    <h3>群障监控大屏</h3>
                    <p>实时监控全网运维态势和群障事件分布</p>
                </div>
                <div class="function-card" onclick="navigateTo('tools')">
                    <div class="card-icon">🔧</div>
                    <h3>运维工具箱</h3>
                    <p>Ping、端口查询、流量分析等常用运维工具</p>
                </div>
                <div class="function-card" onclick="navigateTo('workorder')">
                    <div class="card-icon">📋</div>
                    <h3>工单管理</h3>
                    <p>工单创建、分配、跟踪和统计分析</p>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">实时告警概览</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" style="color: #ff4d4f;">12</div>
                        <div class="metric-label">紧急告警</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #fa8c16;">28</div>
                        <div class="metric-label">重要告警</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #52c41a;">156</div>
                        <div class="metric-label">正常设备</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">最新故障告警</h2>
                <div class="fault-list">
                    ${generateFaultList()}
                </div>
            </div>
        </div>
    `,

    diagnosis: () => `
        <div class="page-content">
            <div class="card">
                <h2 class="card-title">智能故障诊断</h2>
                <div class="tabs">
                    <div class="tab active" data-tab="user">用户号码诊断</div>
                    <div class="tab" data-tab="device">设备诊断</div>
                    <div class="tab" data-tab="batch">批量诊断</div>
                </div>
                
                <div class="tab-content active" data-tab-content="user">
                    <div class="input-group" style="margin-bottom: 12px;">
                        <input type="text" class="input" placeholder="请输入用户宽带或固话号码" id="diagnosisInput" value="13800138000">
                        <button class="btn btn-primary" onclick="startDiagnosis()">🔍 开始诊断</button>
                    </div>
                    <div class="form-hint">
                        💡 支持宽带号码、固话号码、用户账号等多种诊断方式，系统将进行端到端链路分析与故障定位。
                    </div>
                </div>
                
                <div class="tab-content" data-tab-content="device">
                    <div class="input-group" style="margin-bottom: 12px;">
                        <input type="text" class="input" placeholder="请输入设备IP或设备名称" id="deviceInput">
                        <button class="btn btn-primary" onclick="startDeviceDiagnosis()">🔍 设备诊断</button>
                    </div>
                    <div class="form-hint">
                        💡 支持OLT、分光器、光猫等设备的健康状态检查和性能分析。
                    </div>
                </div>
                
                <div class="tab-content" data-tab-content="batch">
                    <div style="margin-bottom: 12px;">
                        <textarea class="textarea" placeholder="请输入多个号码或设备，每行一个" id="batchInput"></textarea>
                    </div>
                    <button class="btn btn-primary" onclick="startBatchDiagnosis()">🔍 批量诊断</button>
                </div>
            </div>

            <div id="diagnosisResult" style="display: none;">
                <div class="card">
                    <div style="display: flex; gap: 32px; margin-bottom: 24px; flex-wrap: wrap;">
                        <div><span style="color: #999;">用户业务号码:</span> <strong>13800138000</strong></div>
                        <div><span style="color: #999;">用户姓名:</span> <strong>张三</strong></div>
                        <div><span style="color: #999;">地址:</span> <strong>北京市朝阳区望京街道XX小区3栋2单元501号</strong></div>
                    </div>
                </div>

                <div class="card">
                    <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 32px; align-items: center;">
                        <div>
                            <div style="color: #999; margin-bottom: 8px;">AI诊断结果</div>
                            <div style="font-size: 28px; font-weight: 600; color: #ff4d4f;">⚠️ 二级分光器故障</div>
                            <div style="margin-top: 8px; color: #666;">根因分析：分光器端口异常，导致下联5个ONU离线</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 600; color: #52c41a;">92%</div>
                            <div style="font-size: 12px; color: #999;">AI置信度</div>
                        </div>
                        <button class="btn btn-primary" onclick="createWorkOrderFromDiagnosis()">🔧 自动创建维修工单</button>
                    </div>
                </div>

                <div class="card">
                    <h2 class="card-title">端到端链路拓扑</h2>
                    <div class="topology-canvas">
                        ${generateTopologyView()}
                    </div>
                </div>
            </div>
        </div>
    `,

    topology: () => `
        <div class="page-content">
            <div class="card">
                <div class="card-title">
                    <span>网络拓扑可视化</span>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="refreshTopology()">🔄 刷新</button>
                        <button class="btn btn-sm btn-secondary" onclick="exportTopology()">📥 导出</button>
                    </div>
                </div>
                
                <div style="display: flex; gap: 16px; margin-bottom: 20px; align-items: center;">
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary active" data-filter="all">全部</button>
                        <button class="btn btn-sm btn-secondary" data-filter="normal">正常</button>
                        <button class="btn btn-sm btn-secondary" data-filter="error">故障</button>
                        <button class="btn btn-sm btn-secondary" data-filter="warning">告警</button>
                    </div>
                    <div style="display: flex; gap: 16px; font-size: 12px; color: #666;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #52c41a;"></div>
                            <span>正常</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #ff4d4f;"></div>
                            <span>故障</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #faad14;"></div>
                            <span>告警</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #999;"></div>
                            <span>离线</span>
                        </div>
                    </div>
                </div>

                <div class="topology-canvas" style="min-height: 500px;">
                    ${generateFullTopology()}
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">设备统计</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" style="color: #52c41a;">156</div>
                        <div class="metric-label">正常设备</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #ff4d4f;">8</div>
                        <div class="metric-label">故障设备</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #faad14;">12</div>
                        <div class="metric-label">告警设备</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    performance: () => `
        <div class="page-content">
            <div class="card">
                <h2 class="card-title">性能监控概览</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" style="color: #52c41a;">98.5%</div>
                        <div class="metric-label">系统可用率</div>
                        <div class="metric-trend trend-up">↑ 0.3%</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #1890ff;">45ms</div>
                        <div class="metric-label">平均响应时间</div>
                        <div class="metric-trend trend-down">↓ 5ms</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #fa8c16;">1,234</div>
                        <div class="metric-label">活跃连接数</div>
                        <div class="metric-trend trend-up">↑ 156</div>
                    </div>
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-header">
                    <div class="chart-title">CPU使用率趋势</div>
                    <div class="chart-controls">
                        <button class="time-btn active">1小时</button>
                        <button class="time-btn">6小时</button>
                        <button class="time-btn">24小时</button>
                        <button class="time-btn">7天</button>
                    </div>
                </div>
                <div class="chart-area">
                    <canvas id="cpuChart" style="width: 100%; height: 100%;"></canvas>
                    <div style="color: #999;">📊 图表数据加载中...</div>
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-header">
                    <div class="chart-title">内存使用率趋势</div>
                    <div class="chart-controls">
                        <button class="time-btn active">1小时</button>
                        <button class="time-btn">6小时</button>
                        <button class="time-btn">24小时</button>
                        <button class="time-btn">7天</button>
                    </div>
                </div>
                <div class="chart-area">
                    <canvas id="memoryChart" style="width: 100%; height: 100%;"></canvas>
                    <div style="color: #999;">📊 图表数据加载中...</div>
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-header">
                    <div class="chart-title">网络流量趋势</div>
                    <div class="chart-controls">
                        <button class="time-btn active">1小时</button>
                        <button class="time-btn">6小时</button>
                        <button class="time-btn">24小时</button>
                        <button class="time-btn">7天</button>
                    </div>
                </div>
                <div class="chart-area">
                    <canvas id="networkChart" style="width: 100%; height: 100%;"></canvas>
                    <div style="color: #999;">📊 图表数据加载中...</div>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">设备性能排行</h2>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>设备名称</th>
                                <th>设备IP</th>
                                <th>CPU使用率</th>
                                <th>内存使用率</th>
                                <th>网络流量</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generatePerformanceTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,

    monitor: () => `
        <div class="monitor-screen">
            <div class="monitor-header">
                <div class="monitor-title">群障监控大屏</div>
                <div class="monitor-time" id="monitorTime">${new Date().toLocaleString('zh-CN')}</div>
            </div>

            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-label">全网健康度</div>
                    <div class="kpi-value health">95.8%</div>
                    <div class="kpi-trend trend-up">↑ 0.5%</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">活跃故障数</div>
                    <div class="kpi-value danger">42</div>
                    <div class="kpi-trend trend-down">↓ 8</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">今日群障事件</div>
                    <div class="kpi-value warning">8</div>
                    <div class="kpi-trend">持平</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">平均修复时间</div>
                    <div class="kpi-value info">2.3h</div>
                    <div class="kpi-trend trend-down">↓ 0.5h</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
                <div class="monitor-map-container">
                    <div style="font-size: 16px; margin-bottom: 16px; color: #8b9dc3;">故障地理分布</div>
                    <div class="map-canvas">
                        ${generateFaultMap()}
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
                    <div style="font-size: 16px; margin-bottom: 16px; color: #8b9dc3;">故障统计</div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>P0-紧急</span>
                            <span style="font-size: 20px; font-weight: 600; color: #ff4d4f;">12</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>P1-重要</span>
                            <span style="font-size: 20px; font-weight: 600; color: #fa8c16;">18</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>P2-警告</span>
                            <span style="font-size: 20px; font-weight: 600; color: #faad14;">12</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                            <span>今日已处理</span>
                            <span style="font-size: 20px; font-weight: 600; color: #52c41a;">156</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
                <div style="font-size: 16px; margin-bottom: 16px; color: #8b9dc3;">实时故障列表</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${generateMonitorFaultList()}
                </div>
            </div>
        </div>
    `,

    tools: () => `
        <div class="page-content">
            <div class="card">
                <h2 class="card-title">运维工具箱</h2>
                <div class="tool-cards">
                    <div class="tool-card" onclick="openTool('ping')">
                        <div class="tool-icon">📡</div>
                        <div class="tool-name">Ping工具</div>
                        <div class="tool-desc">网络连通性测试</div>
                    </div>
                    <div class="tool-card" onclick="openTool('port')">
                        <div class="tool-icon">🔌</div>
                        <div class="tool-name">端口查询</div>
                        <div class="tool-desc">端口状态检测</div>
                    </div>
                    <div class="tool-card" onclick="openTool('traffic')">
                        <div class="tool-icon">📊</div>
                        <div class="tool-name">流量分析</div>
                        <div class="tool-desc">网络流量统计</div>
                    </div>
                    <div class="tool-card" onclick="openTool('traceroute')">
                        <div class="tool-icon">🗺️</div>
                        <div class="tool-name">路由追踪</div>
                        <div class="tool-desc">网络路径分析</div>
                    </div>
                </div>
            </div>

            <div id="toolContent"></div>
        </div>
    `,

    workorder: () => `
        <div class="page-content">
            <div class="card">
                <div class="card-title">
                    <span>工单管理</span>
                    <button class="btn btn-primary" onclick="showCreateWorkOrderModal()">+ 创建工单</button>
                </div>

                <div class="tabs">
                    <div class="tab active" data-tab="all">全部工单</div>
                    <div class="tab" data-tab="pending">待处理</div>
                    <div class="tab" data-tab="processing">处理中</div>
                    <div class="tab" data-tab="completed">已完成</div>
                </div>

                <div class="tab-content active" data-tab-content="all">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>工单号</th>
                                    <th>标题</th>
                                    <th>优先级</th>
                                    <th>状态</th>
                                    <th>创建时间</th>
                                    <th>处理人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generateWorkOrderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">工单统计</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" style="color: #1890ff;">45</div>
                        <div class="metric-label">待处理工单</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #fa8c16;">32</div>
                        <div class="metric-label">处理中工单</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #52c41a;">156</div>
                        <div class="metric-label">今日已完成</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    alarm: () => `
        <div class="page-content">
            <div class="card">
                <div class="card-title">
                    <span>告警规则管理</span>
                    <button class="btn btn-primary" onclick="showCreateAlarmRuleModal()">+ 新建规则</button>
                </div>

                <div class="rule-list">
                    ${generateAlarmRules()}
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">告警统计</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" style="color: #ff4d4f;">12</div>
                        <div class="metric-label">紧急告警</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #fa8c16;">28</div>
                        <div class="metric-label">重要告警</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: #faad14;">45</div>
                        <div class="metric-label">警告告警</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    reports: () => `
        <div class="page-content">
            <div class="card">
                <h2 class="card-title">报表分析</h2>
                
                <div style="background: #f5f7fa; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                    <div class="grid-4">
                        <div class="form-group">
                            <label class="form-label">报表类型</label>
                            <select class="select">
                                <option>故障分析报表</option>
                                <option>性能监控报表</option>
                                <option>工单统计报表</option>
                                <option>告警分析报表</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">开始日期</label>
                            <input type="date" class="input" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">结束日期</label>
                            <input type="date" class="input" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="opacity: 0;">操作</label>
                            <button class="btn btn-primary" onclick="generateReport()">📊 生成报表</button>
                        </div>
                    </div>
                </div>

                <div class="grid-2">
                    <div class="chart-container">
                        <div class="chart-title">故障趋势分析</div>
                        <div class="chart-area">
                            <div style="color: #999;">📊 图表数据加载中...</div>
                        </div>
                    </div>

                    <div class="chart-container">
                        <div class="chart-title">故障类型分布</div>
                        <div class="chart-area">
                            <div style="color: #999;">📊 图表数据加载中...</div>
                        </div>
                    </div>

                    <div class="chart-container">
                        <div class="chart-title">工单处理效率</div>
                        <div class="chart-area">
                            <div style="color: #999;">📊 图表数据加载中...</div>
                        </div>
                    </div>

                    <div class="chart-container">
                        <div class="chart-title">设备健康度分析</div>
                        <div class="chart-area">
                            <div style="color: #999;">📊 图表数据加载中...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">报表导出</h2>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-secondary" onclick="exportReport('pdf')">📄 导出PDF</button>
                    <button class="btn btn-secondary" onclick="exportReport('excel')">📊 导出Excel</button>
                    <button class="btn btn-secondary" onclick="exportReport('csv')">📋 导出CSV</button>
                </div>
            </div>
        </div>
    `,

    knowledge: () => `
        <div class="page-content">
            <div class="card">
                <h2 class="card-title">知识库</h2>
                <div style="margin-bottom: 20px;">
                    <input type="text" class="input" placeholder="搜索故障案例、解决方案..." id="knowledgeSearch">
                </div>
                <div class="function-cards">
                    ${generateKnowledgeCards()}
                </div>
            </div>
        </div>
    `
};


// 辅助函数 - 生成故障列表
function generateFaultList() {
    const faults = [
        { id: 'F20231124001', level: 'P0', title: '光功率异常', user: '13800138000', device: 'OLT-BJ-001', time: '14:23:15', status: '未受理' },
        { id: 'F20231124002', level: 'P1', title: '端口异常', user: '13900139000', device: '分光器-BJ-025', time: '13:45:32', status: '处理中' },
        { id: 'F20231124003', level: 'P2', title: '连接超时', user: '13700137000', device: '光猫-BJ-1025', time: '12:18:09', status: '处理中' }
    ];

    return faults.map(fault => `
        <div class="fault-item" onclick="showFaultDetail('${fault.id}')">
            <div class="fault-header">
                <span class="fault-id">#${fault.id}</span>
                <span class="fault-level ${fault.level}">${fault.level}-${fault.level === 'P0' ? '紧急' : fault.level === 'P1' ? '重要' : '警告'}</span>
            </div>
            <div class="fault-title">${fault.title}</div>
            <div class="fault-meta">用户: ${fault.user} | 设备: ${fault.device} | ${fault.time} | ${fault.status}</div>
        </div>
    `).join('');
}

// 生成拓扑视图
function generateTopologyView() {
    return `
        <div class="topology-node" onclick="showNodeDetail('OLT', 'OLT-BJ-001', '192.168.1.1', 'normal')">
            <div class="node-icon normal">🖥️</div>
            <div class="node-label">OLT</div>
            <div class="node-status normal">正常</div>
        </div>
        <div class="topology-arrow active">→</div>
        <div class="topology-node" onclick="showNodeDetail('Splitter1', '一级分光器-BJ-025', '192.168.1.25', 'normal')">
            <div class="node-icon normal">📡</div>
            <div class="node-label">一级分光器</div>
            <div class="node-status normal">正常</div>
        </div>
        <div class="topology-arrow error">→</div>
        <div class="topology-node" onclick="showNodeDetail('Splitter2', '二级分光器-BJ-125', '192.168.1.125', 'error')">
            <div class="node-icon error">📡</div>
            <div class="node-label">二级分光器</div>
            <div class="node-status error">故障</div>
        </div>
        <div class="topology-arrow">→</div>
        <div class="topology-node" onclick="showNodeDetail('ONU', '光猫-BJ-1025', '192.168.1.225', 'offline')">
            <div class="node-icon">📱</div>
            <div class="node-label">光猫</div>
            <div class="node-status offline">离线</div>
        </div>
        <div class="topology-arrow">→</div>
        <div class="topology-node" onclick="showNodeDetail('Router', '路由器-USER-501', '192.168.1.254', 'offline')">
            <div class="node-icon">📶</div>
            <div class="node-label">路由器</div>
            <div class="node-status offline">离线</div>
        </div>
    `;
}

// 生成完整拓扑图
function generateFullTopology() {
    return `
        <div style="display: flex; flex-direction: column; gap: 40px; width: 100%;">
            <div style="display: flex; justify-content: center; gap: 40px; align-items: center;">
                <div class="topology-node" onclick="showNodeDetail('Core', '核心路由器', '10.0.0.1', 'normal')">
                    <div class="node-icon normal">🌐</div>
                    <div class="node-label">核心路由器</div>
                    <div class="node-status normal">正常</div>
                </div>
            </div>
            <div style="display: flex; justify-content: center; gap: 60px; align-items: center;">
                <div class="topology-node" onclick="showNodeDetail('OLT1', 'OLT-BJ-001', '192.168.1.1', 'normal')">
                    <div class="node-icon normal">🖥️</div>
                    <div class="node-label">OLT-BJ-001</div>
                    <div class="node-status normal">正常</div>
                </div>
                <div class="topology-node" onclick="showNodeDetail('OLT2', 'OLT-BJ-002', '192.168.1.2', 'warning')">
                    <div class="node-icon warning">🖥️</div>
                    <div class="node-label">OLT-BJ-002</div>
                    <div class="node-status warning">告警</div>
                </div>
                <div class="topology-node" onclick="showNodeDetail('OLT3', 'OLT-BJ-003', '192.168.1.3', 'normal')">
                    <div class="node-icon normal">🖥️</div>
                    <div class="node-label">OLT-BJ-003</div>
                    <div class="node-status normal">正常</div>
                </div>
            </div>
            <div style="display: flex; justify-content: center; gap: 40px; align-items: center;">
                <div class="topology-node" onclick="showNodeDetail('Splitter1', '分光器-BJ-025', '192.168.1.25', 'normal')">
                    <div class="node-icon normal">📡</div>
                    <div class="node-label">分光器-025</div>
                    <div class="node-status normal">正常</div>
                </div>
                <div class="topology-node" onclick="showNodeDetail('Splitter2', '分光器-BJ-125', '192.168.1.125', 'error')">
                    <div class="node-icon error">📡</div>
                    <div class="node-label">分光器-125</div>
                    <div class="node-status error">故障</div>
                </div>
                <div class="topology-node" onclick="showNodeDetail('Splitter3', '分光器-BJ-225', '192.168.1.225', 'normal')">
                    <div class="node-icon normal">📡</div>
                    <div class="node-label">分光器-225</div>
                    <div class="node-status normal">正常</div>
                </div>
            </div>
        </div>
    `;
}

// 生成性能表格
function generatePerformanceTable() {
    const devices = [
        { name: 'OLT-BJ-001', ip: '192.168.1.1', cpu: '45%', memory: '62%', traffic: '1.2GB/s', status: 'normal' },
        { name: 'OLT-BJ-002', ip: '192.168.1.2', cpu: '78%', memory: '85%', traffic: '2.1GB/s', status: 'warning' },
        { name: 'OLT-BJ-003', ip: '192.168.1.3', cpu: '32%', memory: '48%', traffic: '0.8GB/s', status: 'normal' },
        { name: '分光器-BJ-025', ip: '192.168.1.25', cpu: '12%', memory: '28%', traffic: '0.5GB/s', status: 'normal' },
        { name: '分光器-BJ-125', ip: '192.168.1.125', cpu: 'N/A', memory: 'N/A', traffic: 'N/A', status: 'error' }
    ];

    return devices.map(device => `
        <tr>
            <td>${device.name}</td>
            <td>${device.ip}</td>
            <td>${device.cpu}</td>
            <td>${device.memory}</td>
            <td>${device.traffic}</td>
            <td><span class="status-badge ${device.status}">${device.status === 'normal' ? '正常' : device.status === 'warning' ? '告警' : '故障'}</span></td>
        </tr>
    `).join('');
}

// 生成故障地图
function generateFaultMap() {
    return `
        <div style="width: 100%; height: 100%; position: relative; background: linear-gradient(135deg, #1a2332 0%, #2d3748 100%);">
            <div class="fault-point critical" style="top: 30%; left: 25%;" onclick="showFaultOnMap('北京朝阳区')"></div>
            <div class="fault-point major" style="top: 45%; left: 60%;" onclick="showFaultOnMap('北京海淀区')"></div>
            <div class="fault-point minor" style="top: 65%; left: 40%;" onclick="showFaultOnMap('北京丰台区')"></div>
            <div class="fault-point critical" style="top: 25%; left: 75%;" onclick="showFaultOnMap('北京昌平区')"></div>
            <div class="fault-point major" style="top: 70%; left: 20%;" onclick="showFaultOnMap('北京石景山区')"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; opacity: 0.1;">🗺️</div>
        </div>
    `;
}

// 生成监控故障列表
function generateMonitorFaultList() {
    const faults = [
        { id: 'F001', level: 'critical', area: '朝阳区', desc: '二级分光器故障', time: '14:23' },
        { id: 'F002', level: 'major', area: '海淀区', desc: 'OLT端口异常', time: '13:45' },
        { id: 'F003', level: 'minor', area: '丰台区', desc: '光猫离线', time: '12:18' },
        { id: 'F004', level: 'critical', area: '昌平区', desc: '光功率异常', time: '11:52' },
        { id: 'F005', level: 'major', area: '石景山区', desc: '网络拥塞', time: '10:30' }
    ];

    return faults.map(fault => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; cursor: pointer;" onclick="showFaultDetail('${fault.id}')">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${fault.level === 'critical' ? '#ff4d4f' : fault.level === 'major' ? '#fa8c16' : '#faad14'};"></div>
                <div>
                    <div style="font-size: 14px; margin-bottom: 4px;">${fault.desc}</div>
                    <div style="font-size: 12px; color: #8b9dc3;">${fault.area} | ${fault.time}</div>
                </div>
            </div>
            <div style="color: #8b9dc3;">→</div>
        </div>
    `).join('');
}


// 生成工单表格
function generateWorkOrderTable() {
    const workorders = [
        { id: 'WO20231124001', title: '二级分光器故障维修', priority: 'P0', status: 'pending', time: '2023-11-24 14:23', handler: '未分配' },
        { id: 'WO20231124002', title: 'OLT端口异常处理', priority: 'P1', status: 'processing', time: '2023-11-24 13:45', handler: '李四' },
        { id: 'WO20231124003', title: '光猫更换', priority: 'P2', status: 'processing', time: '2023-11-24 12:18', handler: '王五' },
        { id: 'WO20231123001', title: '网络优化', priority: 'P2', status: 'completed', time: '2023-11-23 10:30', handler: '赵六' }
    ];

    return workorders.map(wo => `
        <tr onclick="showWorkOrderDetail('${wo.id}')">
            <td>${wo.id}</td>
            <td>${wo.title}</td>
            <td><span class="fault-level ${wo.priority}">${wo.priority}</span></td>
            <td><span class="status-badge ${wo.status === 'pending' ? 'warning' : wo.status === 'processing' ? 'info' : 'success'}">${wo.status === 'pending' ? '待处理' : wo.status === 'processing' ? '处理中' : '已完成'}</span></td>
            <td>${wo.time}</td>
            <td>${wo.handler}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); editWorkOrder('${wo.id}')">编辑</button>
            </td>
        </tr>
    `).join('');
}

// 生成告警规则
function generateAlarmRules() {
    const rules = [
        { id: 1, name: 'CPU使用率告警', desc: '当CPU使用率超过80%时触发告警', status: 'enabled' },
        { id: 2, name: '内存使用率告警', desc: '当内存使用率超过85%时触发告警', status: 'enabled' },
        { id: 3, name: '网络流量告警', desc: '当网络流量超过阈值时触发告警', status: 'enabled' },
        { id: 4, name: '设备离线告警', desc: '当设备离线超过5分钟时触发告警', status: 'enabled' },
        { id: 5, name: '光功率异常告警', desc: '当光功率超出正常范围时触发告警', status: 'disabled' }
    ];

    return rules.map(rule => `
        <div class="rule-item">
            <div class="rule-header">
                <div class="rule-name">${rule.name}</div>
                <span class="rule-status ${rule.status}">${rule.status === 'enabled' ? '已启用' : '已禁用'}</span>
            </div>
            <div class="rule-content">${rule.desc}</div>
            <div class="rule-actions">
                <button class="action-btn" onclick="editAlarmRule(${rule.id})">编辑</button>
                <button class="action-btn" onclick="toggleAlarmRule(${rule.id})">${rule.status === 'enabled' ? '禁用' : '启用'}</button>
                <button class="action-btn" onclick="deleteAlarmRule(${rule.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 生成知识库卡片
function generateKnowledgeCards() {
    const articles = [
        { title: '光功率异常处理指南', desc: '常见光功率异常的诊断和处理方法', category: '故障处理' },
        { title: '端口故障排查流程', desc: '端口异常的排查步骤和解决方案', category: '故障处理' },
        { title: 'OLT设备维护手册', desc: 'OLT设备的日常维护和故障处理', category: '设备维护' },
        { title: '网络优化最佳实践', desc: '网络性能优化的方法和技巧', category: '优化指南' },
        { title: '分光器故障案例集', desc: '分光器常见故障案例和解决方案', category: '案例分析' },
        { title: '光猫配置指南', desc: '光猫的配置方法和注意事项', category: '配置指南' }
    ];

    return articles.map(article => `
        <div class="function-card" onclick="showKnowledgeDetail('${article.title}')">
            <h3>${article.title}</h3>
            <p>${article.desc}</p>
            <div style="margin-top: 12px;">
                <span class="status-badge info">${article.category}</span>
            </div>
        </div>
    `).join('');
}


// 页面导航
function navigateTo(pageName) {
    AppState.currentPage = pageName;
    
    // 更新菜单状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });
    
    // 渲染页面内容
    const mainContent = document.getElementById('mainContent');
    if (PageContents[pageName]) {
        mainContent.innerHTML = PageContents[pageName]();
        
        // 初始化标签页功能
        initTabs();
        
        // 如果是监控大屏，启动时间更新
        if (pageName === 'monitor') {
            startMonitorTimeUpdate();
        }
    }
}

// 初始化标签页功能
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            const parent = this.closest('.card') || this.closest('.page-content');
            
            // 更新标签状态
            parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            parent.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tabContent === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 诊断功能
function startDiagnosis() {
    const input = document.getElementById('diagnosisInput').value;
    if (!input) {
        showMessage('请输入用户号码', 'warning');
        return;
    }
    
    showMessage('正在进行端到端链路诊断...', 'info');
    
    // 模拟诊断过程
    setTimeout(() => {
        document.getElementById('diagnosisResult').style.display = 'block';
        document.getElementById('diagnosisResult').scrollIntoView({ behavior: 'smooth' });
        showMessage('诊断完成！发现二级分光器故障', 'success');
    }, 1500);
}

function startDeviceDiagnosis() {
    const input = document.getElementById('deviceInput').value;
    if (!input) {
        showMessage('请输入设备IP或名称', 'warning');
        return;
    }
    showMessage('正在进行设备诊断...', 'info');
}

function startBatchDiagnosis() {
    const input = document.getElementById('batchInput').value;
    if (!input) {
        showMessage('请输入要诊断的号码或设备', 'warning');
        return;
    }
    showMessage('正在进行批量诊断...', 'info');
}

// 显示故障详情
function showFaultDetail(faultId) {
    showMessage(`查看故障详情: ${faultId}`, 'info');
    navigateTo('diagnosis');
    setTimeout(() => {
        const diagnosisResult = document.getElementById('diagnosisResult');
        if (diagnosisResult) {
            diagnosisResult.style.display = 'block';
            diagnosisResult.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

// 显示节点详情
function showNodeDetail(nodeType, name, ip, status) {
    const statusText = status === 'normal' ? '正常' : status === 'error' ? '故障' : status === 'warning' ? '告警' : '离线';
    const statusColor = status === 'normal' ? '#52c41a' : status === 'error' ? '#ff4d4f' : status === 'warning' ? '#faad14' : '#999';
    
    showModal('设备详情', `
        <div style="display: grid; gap: 16px;">
            <div><strong>设备名称:</strong> ${name}</div>
            <div><strong>设备IP:</strong> ${ip}</div>
            <div><strong>设备状态:</strong> <span style="color: ${statusColor};">${statusText}</span></div>
            <div><strong>CPU使用率:</strong> ${status === 'normal' ? '45%' : 'N/A'}</div>
            <div><strong>内存使用率:</strong> ${status === 'normal' ? '62%' : 'N/A'}</div>
            <div><strong>最后心跳:</strong> ${new Date().toLocaleString('zh-CN')}</div>
        </div>
    `);
}

// 创建工单
function createWorkOrderFromDiagnosis() {
    showMessage('正在创建维修工单...', 'info');
    setTimeout(() => {
        showMessage('工单创建成功！工单号：WO20231124001', 'success');
    }, 1000);
}

// 运维工具
function openTool(toolName) {
    const toolContent = document.getElementById('toolContent');
    let content = '';
    
    switch(toolName) {
        case 'ping':
            content = `
                <div class="card">
                    <h2 class="card-title">Ping工具</h2>
                    <div class="form-group">
                        <label class="form-label">目标地址</label>
                        <input type="text" class="input" id="pingTarget" placeholder="请输入IP地址或域名" value="192.168.1.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Ping次数</label>
                        <input type="number" class="input" id="pingCount" value="4">
                    </div>
                    <button class="btn btn-primary" onclick="executePing()">🚀 开始Ping</button>
                    <div id="pingResult" class="result-area" style="margin-top: 20px; display: none;"></div>
                </div>
            `;
            break;
        case 'port':
            content = `
                <div class="card">
                    <h2 class="card-title">端口查询</h2>
                    <div class="form-group">
                        <label class="form-label">目标地址</label>
                        <input type="text" class="input" id="portTarget" placeholder="请输入IP地址" value="192.168.1.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">端口号</label>
                        <input type="text" class="input" id="portNumber" placeholder="请输入端口号，多个端口用逗号分隔" value="80,443,22">
                    </div>
                    <button class="btn btn-primary" onclick="executePortScan()">🔍 查询端口</button>
                    <div id="portResult" class="result-area" style="margin-top: 20px; display: none;"></div>
                </div>
            `;
            break;
        case 'traffic':
            content = `
                <div class="card">
                    <h2 class="card-title">流量分析</h2>
                    <div class="form-group">
                        <label class="form-label">设备IP</label>
                        <input type="text" class="input" id="trafficTarget" placeholder="请输入设备IP" value="192.168.1.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">时间范围</label>
                        <select class="select" id="trafficTimeRange">
                            <option>最近1小时</option>
                            <option>最近6小时</option>
                            <option>最近24小时</option>
                            <option>最近7天</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" onclick="executeTrafficAnalysis()">📊 分析流量</button>
                    <div id="trafficResult" class="result-area" style="margin-top: 20px; display: none;"></div>
                </div>
            `;
            break;
        case 'traceroute':
            content = `
                <div class="card">
                    <h2 class="card-title">路由追踪</h2>
                    <div class="form-group">
                        <label class="form-label">目标地址</label>
                        <input type="text" class="input" id="traceTarget" placeholder="请输入IP地址或域名" value="www.baidu.com">
                    </div>
                    <button class="btn btn-primary" onclick="executeTraceroute()">🗺️ 开始追踪</button>
                    <div id="traceResult" class="result-area" style="margin-top: 20px; display: none;"></div>
                </div>
            `;
            break;
    }
    
    toolContent.innerHTML = content;
}

// 执行Ping
function executePing() {
    const target = document.getElementById('pingTarget').value;
    const count = document.getElementById('pingCount').value;
    const resultDiv = document.getElementById('pingResult');
    
    if (!target) {
        showMessage('请输入目标地址', 'warning');
        return;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `正在Ping ${target}...\n`;
    
    // 模拟Ping结果
    let i = 0;
    const interval = setInterval(() => {
        if (i < count) {
            const time = Math.floor(Math.random() * 50) + 10;
            resultDiv.innerHTML += `\n来自 ${target} 的回复: 字节=32 时间=${time}ms TTL=64`;
            i++;
        } else {
            clearInterval(interval);
            resultDiv.innerHTML += `\n\n${target} 的 Ping 统计信息:\n    数据包: 已发送 = ${count}，已接收 = ${count}，丢失 = 0 (0% 丢失)\n往返行程的估计时间(以毫秒为单位):\n    最短 = 10ms，最长 = 50ms，平均 = 30ms`;
        }
    }, 500);
}

// 执行端口扫描
function executePortScan() {
    const target = document.getElementById('portTarget').value;
    const ports = document.getElementById('portNumber').value;
    const resultDiv = document.getElementById('portResult');
    
    if (!target || !ports) {
        showMessage('请输入目标地址和端口号', 'warning');
        return;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `正在扫描 ${target} 的端口...\n`;
    
    // 模拟端口扫描结果
    const portList = ports.split(',');
    let i = 0;
    const interval = setInterval(() => {
        if (i < portList.length) {
            const port = portList[i].trim();
            const isOpen = Math.random() > 0.3;
            const status = isOpen ? '开放' : '关闭';
            const color = isOpen ? 'result-success' : 'result-error';
            resultDiv.innerHTML += `\n<span class="${color}">端口 ${port}: ${status}</span>`;
            i++;
        } else {
            clearInterval(interval);
            resultDiv.innerHTML += `\n\n扫描完成！`;
        }
    }, 500);
}

// 执行流量分析
function executeTrafficAnalysis() {
    const target = document.getElementById('trafficTarget').value;
    const timeRange = document.getElementById('trafficTimeRange').value;
    const resultDiv = document.getElementById('trafficResult');
    
    if (!target) {
        showMessage('请输入设备IP', 'warning');
        return;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `正在分析 ${target} 的流量数据 (${timeRange})...\n\n`;
    
    setTimeout(() => {
        resultDiv.innerHTML += `流量统计结果:\n`;
        resultDiv.innerHTML += `\n入站流量: 1.2 GB`;
        resultDiv.innerHTML += `\n出站流量: 0.8 GB`;
        resultDiv.innerHTML += `\n总流量: 2.0 GB`;
        resultDiv.innerHTML += `\n平均速率: 512 Kbps`;
        resultDiv.innerHTML += `\n峰值速率: 2.1 Mbps`;
        resultDiv.innerHTML += `\n数据包数: 1,234,567`;
        resultDiv.innerHTML += `\n\n<span class="result-success">分析完成！</span>`;
    }, 1500);
}

// 执行路由追踪
function executeTraceroute() {
    const target = document.getElementById('traceTarget').value;
    const resultDiv = document.getElementById('traceResult');
    
    if (!target) {
        showMessage('请输入目标地址', 'warning');
        return;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `正在追踪到 ${target} 的路由...\n`;
    
    // 模拟路由追踪结果
    const hops = [
        { hop: 1, ip: '192.168.1.1', time: '1ms', name: '本地网关' },
        { hop: 2, ip: '10.0.0.1', time: '5ms', name: '核心路由器' },
        { hop: 3, ip: '202.106.0.1', time: '15ms', name: 'ISP路由器' },
        { hop: 4, ip: '61.135.169.1', time: '25ms', name: '骨干网' },
        { hop: 5, ip: target, time: '35ms', name: '目标主机' }
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < hops.length) {
            const hop = hops[i];
            resultDiv.innerHTML += `\n${hop.hop}  ${hop.time.padEnd(10)} ${hop.ip.padEnd(20)} ${hop.name}`;
            i++;
        } else {
            clearInterval(interval);
            resultDiv.innerHTML += `\n\n<span class="result-success">追踪完成！</span>`;
        }
    }, 500);
}


// 工单管理
function showCreateWorkOrderModal() {
    showModal('创建工单', `
        <form id="workOrderForm">
            <div class="grid-2">
                <div class="form-group">
                    <label class="form-label">工单标题</label>
                    <input type="text" class="input" id="woTitle" placeholder="请输入工单标题" required>
                </div>
                <div class="form-group">
                    <label class="form-label">优先级</label>
                    <select class="select" id="woPriority">
                        <option value="P0">P0-紧急</option>
                        <option value="P1">P1-重要</option>
                        <option value="P2" selected>P2-普通</option>
                    </select>
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label class="form-label">故障类型</label>
                    <select class="select" id="woType">
                        <option>设备故障</option>
                        <option>网络故障</option>
                        <option>性能问题</option>
                        <option>其他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">处理人</label>
                    <select class="select" id="woHandler">
                        <option value="">待分配</option>
                        <option>张三</option>
                        <option>李四</option>
                        <option>王五</option>
                        <option>赵六</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">故障描述</label>
                <textarea class="textarea" id="woDescription" placeholder="请详细描述故障情况" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">故障位置</label>
                <input type="text" class="input" id="woLocation" placeholder="请输入故障位置">
            </div>
        </form>
    `, [
        { text: '取消', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: '创建工单', class: 'btn-primary', onclick: 'submitWorkOrder()' }
    ]);
}

function submitWorkOrder() {
    const title = document.getElementById('woTitle').value;
    const description = document.getElementById('woDescription').value;
    
    if (!title || !description) {
        showMessage('请填写必填项', 'warning');
        return;
    }
    
    showMessage('工单创建成功！', 'success');
    closeModal();
    
    // 刷新工单列表
    setTimeout(() => {
        navigateTo('workorder');
    }, 500);
}

function showWorkOrderDetail(woId) {
    showModal('工单详情', `
        <div style="display: grid; gap: 16px;">
            <div><strong>工单号:</strong> ${woId}</div>
            <div><strong>标题:</strong> 二级分光器故障维修</div>
            <div><strong>优先级:</strong> <span class="fault-level P0">P0-紧急</span></div>
            <div><strong>状态:</strong> <span class="status-badge warning">待处理</span></div>
            <div><strong>创建时间:</strong> 2023-11-24 14:23:15</div>
            <div><strong>处理人:</strong> 未分配</div>
            <div><strong>故障描述:</strong> 分光器端口异常，导致下联5个ONU离线</div>
            <div><strong>故障位置:</strong> 北京市朝阳区望京街道</div>
        </div>
    `, [
        { text: '关闭', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: '分配工单', class: 'btn-primary', onclick: 'assignWorkOrder("' + woId + '")' }
    ]);
}

function editWorkOrder(woId) {
    showMessage(`编辑工单: ${woId}`, 'info');
}

function assignWorkOrder(woId) {
    showMessage(`工单 ${woId} 已分配`, 'success');
    closeModal();
}

// 告警管理
function showCreateAlarmRuleModal() {
    showModal('新建告警规则', `
        <form id="alarmRuleForm">
            <div class="form-group">
                <label class="form-label">规则名称</label>
                <input type="text" class="input" id="ruleName" placeholder="请输入规则名称" required>
            </div>
            <div class="form-group">
                <label class="form-label">监控指标</label>
                <select class="select" id="ruleMetric">
                    <option>CPU使用率</option>
                    <option>内存使用率</option>
                    <option>网络流量</option>
                    <option>磁盘使用率</option>
                    <option>设备状态</option>
                </select>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label class="form-label">告警条件</label>
                    <select class="select" id="ruleCondition">
                        <option>大于</option>
                        <option>小于</option>
                        <option>等于</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">阈值</label>
                    <input type="number" class="input" id="ruleThreshold" placeholder="请输入阈值">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">规则描述</label>
                <textarea class="textarea" id="ruleDescription" placeholder="请描述告警规则"></textarea>
            </div>
        </form>
    `, [
        { text: '取消', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: '创建规则', class: 'btn-primary', onclick: 'submitAlarmRule()' }
    ]);
}

function submitAlarmRule() {
    const name = document.getElementById('ruleName').value;
    if (!name) {
        showMessage('请输入规则名称', 'warning');
        return;
    }
    
    showMessage('告警规则创建成功！', 'success');
    closeModal();
    navigateTo('alarm');
}

function editAlarmRule(ruleId) {
    showMessage(`编辑告警规则: ${ruleId}`, 'info');
}

function toggleAlarmRule(ruleId) {
    showMessage(`告警规则状态已切换`, 'success');
    setTimeout(() => navigateTo('alarm'), 500);
}

function deleteAlarmRule(ruleId) {
    if (confirm('确定要删除这条告警规则吗？')) {
        showMessage('告警规则已删除', 'success');
        setTimeout(() => navigateTo('alarm'), 500);
    }
}

// 报表分析
function generateReport() {
    showMessage('正在生成报表...', 'info');
    setTimeout(() => {
        showMessage('报表生成成功！', 'success');
    }, 1500);
}

function exportReport(format) {
    showMessage(`正在导出${format.toUpperCase()}格式报表...`, 'info');
    setTimeout(() => {
        showMessage(`报表已导出为${format.toUpperCase()}格式`, 'success');
    }, 1000);
}

// 知识库
function showKnowledgeDetail(title) {
    showModal(title, `
        <div style="line-height: 1.8;">
            <h3 style="margin-bottom: 16px;">故障描述</h3>
            <p style="margin-bottom: 24px;">这是关于"${title}"的详细内容。包含故障现象、诊断步骤、解决方案等完整信息。</p>
            
            <h3 style="margin-bottom: 16px;">诊断步骤</h3>
            <ol style="margin-bottom: 24px; padding-left: 20px;">
                <li>检查设备物理连接状态</li>
                <li>查看设备运行日志</li>
                <li>测试网络连通性</li>
                <li>分析性能指标数据</li>
            </ol>
            
            <h3 style="margin-bottom: 16px;">解决方案</h3>
            <p>根据诊断结果，采取相应的处理措施，必要时联系厂商技术支持。</p>
        </div>
    `);
}

// 拓扑图功能
function refreshTopology() {
    showMessage('正在刷新拓扑图...', 'info');
    setTimeout(() => {
        showMessage('拓扑图已刷新', 'success');
    }, 1000);
}

function exportTopology() {
    showMessage('正在导出拓扑图...', 'info');
    setTimeout(() => {
        showMessage('拓扑图已导出', 'success');
    }, 1000);
}

function showFaultOnMap(area) {
    showMessage(`查看${area}的故障详情`, 'info');
}

// 监控大屏时间更新
function startMonitorTimeUpdate() {
    const updateTime = () => {
        const timeElement = document.getElementById('monitorTime');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleString('zh-CN');
        }
    };
    
    updateTime();
    setInterval(updateTime, 1000);
}

// 通用模态框
function showModal(title, content, buttons = null) {
    const modalContainer = document.getElementById('modalContainer');
    
    let buttonHTML = '';
    if (buttons && buttons.length > 0) {
        buttonHTML = '<div class="modal-footer">';
        buttons.forEach(btn => {
            buttonHTML += `<button class="btn ${btn.class}" onclick="${btn.onclick}">${btn.text}</button>`;
        });
        buttonHTML += '</div>';
    } else {
        buttonHTML = '<div class="modal-footer"><button class="btn btn-primary" onclick="closeModal()">确定</button></div>';
    }
    
    modalContainer.innerHTML = `
        <div class="modal active" onclick="if(event.target === this) closeModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">${title}</div>
                    <div class="modal-close" onclick="closeModal()">×</div>
                </div>
                <div>${content}</div>
                ${buttonHTML}
            </div>
        </div>
    `;
}

function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = '';
}

// 消息提示
function showMessage(message, type = 'info') {
    const colors = {
        success: '#52c41a',
        error: '#ff4d4f',
        warning: '#faad14',
        info: '#1890ff'
    };
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        background: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid ${colors[type]};
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 通知功能
function showNotifications() {
    const notifications = AppState.notifications.map(notif => `
        <div style="padding: 12px; border-bottom: 1px solid #e8ecf1; cursor: pointer;" onclick="closeModal()">
            <div style="font-weight: 500; margin-bottom: 4px;">${notif.title}</div>
            <div style="font-size: 12px; color: #999;">${notif.time}</div>
        </div>
    `).join('');
    
    showModal('通知中心', `
        <div style="max-height: 400px; overflow-y: auto; margin: -12px;">
            ${notifications}
        </div>
    `);
}

// 用户菜单
function showUserMenu() {
    showModal('用户信息', `
        <div style="text-align: center; padding: 20px;">
            <div class="user-avatar" style="width: 64px; height: 64px; font-size: 32px; margin: 0 auto 16px;">张</div>
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">${AppState.userData.name}</div>
            <div style="color: #999; margin-bottom: 4px;">${AppState.userData.role}</div>
            <div style="color: #999; margin-bottom: 24px;">${AppState.userData.department}</div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button class="btn btn-secondary" onclick="closeModal()">个人设置</button>
                <button class="btn btn-secondary" onclick="closeModal()">修改密码</button>
                <button class="btn btn-danger" onclick="logout()">退出登录</button>
            </div>
        </div>
    `);
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        showMessage('已退出登录', 'success');
        closeModal();
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单点击事件
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.dataset.page;
            if (pageName) {
                navigateTo(pageName);
            }
        });
    });
    
    // 加载首页
    navigateTo('home');
    
    // 全局搜索功能
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (query) {
                    showMessage(`搜索: ${query}`, 'info');
                }
            }
        });
    }
    
    console.log('端到端智能运维系统已加载');
});
