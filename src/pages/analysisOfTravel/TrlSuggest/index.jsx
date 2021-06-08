import React, { Component } from 'react';
import styles from './index.less';
import TrlSuggestComp from '../../../components/TrlSuggestComp/index';
import { Card, Spin } from 'antd';
import ChartTitle from '../../../components/ChartTitle';
import introduce from '../../../static/introduce.png';
import utils from '../../../utils/utils';

class Index extends Component {
  render() {
    const { suggestData, loading } = this.props;
    const publicTrafficRatio = suggestData && suggestData.publicTrafficRatio.split(',')[0];
    const roadCongestion = suggestData && suggestData.roadCongestion.split(',')[0];
    const travelTime = suggestData && Number(suggestData.travelTime.split(',')[0]);
    const travellerCnt = suggestData && Number(suggestData.travellerCnt.split(',')[0]);

    const position = [1, 2, 3];
    //客流出行人数
    const travellerCntData = [1000000, 5000000, 10000000];
    let travellerCntInfo = { toolTip: travellerCnt, position: 4 };
    for (let i = 0; i < travellerCntData.length; i++) {
      if (travellerCnt <= travellerCntData[i]) {
        travellerCntInfo = { toolTip: travellerCnt, position: position[i] };
        break;
      }
    }
    //道路拥挤程度
    const roadCongestionData = [0.25, 0.5, 0.75];
    let roadCongestionInfo = { toolTip: utils.getFloat(roadCongestion), position: 4 };
    for (let i = 0; i < roadCongestionData.length; i++) {
      if (roadCongestion <= roadCongestionData[i]) {
        roadCongestionInfo = { toolTip: utils.numberTranFormPercent(roadCongestion), position: position[i] };
        break;
      }
    }
    //出行时间
    const timeData = [20, 40, 60];
    let timeInfo = { toolTip: travelTime + 'min', position: 4 };
    for (let i = 0; i < timeData.length; i++) {
      if (travelTime <= timeData[i]) {
        timeInfo = { toolTip: travelTime + 'min', position: position[i] };
        break;
      }
    }
    //公共交通分担率
    const publicTrafficRatioData = [0.25, 0.5, 0.75];
    let publicTrafficRatioInfo = { toolTip: utils.numberTranFormPercent(publicTrafficRatio), position: 4 };
    for (let i = 0; i < publicTrafficRatioData.length; i++) {
      if (publicTrafficRatio <= publicTrafficRatioData[i]) {
        publicTrafficRatioInfo = { position: position[i], toolTip: utils.numberTranFormPercent(publicTrafficRatio) };
        break;
      }
    }

    const time = ['>60min', '60-40min', '40-20min', '<20min'];
    const publicPercent = ['公共出行为主', '公共出行居多', '基本持平', '其他出行居多'];
    const road = ['非常拥堵', '拥堵', '基本畅通', '畅通'];
    const people = ['非常多', '较多', '正常', '偏少'];

    const showTexttime = [...time].reverse();
    const showTextpublicPercent = [...publicPercent].reverse();
    const showTextroad = [...road].reverse();
    const showTextpeople = [...people].reverse();

    return (
      <div className={styles.wrap_suggest}>
        <Spin spinning={loading}>
          <TrlSuggestComp dataInfo={travellerCntInfo} title={'客流出行人数'} text={people}/>
          <TrlSuggestComp dataInfo={roadCongestionInfo} title={'道路拥堵程度'} text={road}/>
          <TrlSuggestComp dataInfo={timeInfo} title={'出行时间'} text={time}/>
          <TrlSuggestComp dataInfo={publicTrafficRatioInfo} title={'公共交通机动化出行分担率'} text={publicPercent}/>

          <Card className={styles.wrap_card1}
                title={<div>分析建议</div>}>
            <div className={styles.show_text}>
              分析建议：两地之间有{utils.transform(travellerCnt)}的客流出行人数，主要通行道路{showTextroad[roadCongestionInfo.position - 1]}，
              人群出行以{showTextpublicPercent[publicTrafficRatioInfo.position - 1]}，总体出行时间分布在{showTexttime[timeInfo.position - 1]}范围。
            </div>

          </Card>
        </Spin>
      </div>
    );
  }
}

export default Index;
