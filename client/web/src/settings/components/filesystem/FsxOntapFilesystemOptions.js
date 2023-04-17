/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import {
    Row,
    Col,
    Input,
    InputGroup,
    FormGroup,
    Label, } from 'reactstrap'
import {
    SaasBoostSelect,
    SaasBoostInput,
    SaasBoostCheckbox,
} from '../../../components/FormComponents'
import Slider from 'rc-slider'

export default class FsxOntapFilesystemOptions extends React.Component {
    render() {
        let props = this.props
        const fsMarks = {
            1: '1',
            192: '192',
          }

          const tpMarks = {
            7: '128',
            11: '2048',
          }

          const volMarks = {
            1: '1',
            100: '100',
          }

          const onStorageChange = (val) => {
            props.setFieldValue(
              props.formikFilesystemTierPrefix + '.storageGb',
              val * 1024
            )
          }

          const onThroughputChange = (val) => {
            props.setFieldValue(
              props.formikFilesystemTierPrefix + '.throughputMbs',
              Math.pow(2, val)
            )
          }

          const onVolumeChange = (val) => {
            props.setFieldValue(
              props.formikFilesystemTierPrefix + '.volumeSize',
              val
            )
          }

          const onWeeklyMaintTimeChange = (val) => {
            props.setFieldValue(
              props.formikFilesystemTierPrefix + '.weeklyMaintenanceTime',
              val.target.value
            )
          }

          const onWeeklyDayChange = (val) => {
            props.setFieldValue(
              props.formikFilesystemTierPrefix + '.weeklyMaintenanceDay',
              val.target.value
            )
          }

          if (!!props.forTier) {
            return (
              <Row>
                <Col sm={6} className="mt-2">
                  <Row>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="storageVal">Storage</Label>
                        <Input
                          id={'storageVal' + props.formikFilesystemTierPrefix}
                          className="mb-4"
                          type="number"
                          value={props.filesystem?.storageGb / 1024}
                          readOnly
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col xs={9}>
                      <FormGroup>
                        <Label htmlFor="storage">In TiB</Label>
                        <Slider
                          id={'storage' + props.formikFilesystemTierPrefix}
                          defaultValue={props.filesystem?.storageGb / 1024}
                          onChange={onStorageChange}
                          className="mb-4"
                          marks={fsMarks}
                          included={false}
                          min={1}
                          max={192}
                          step={1}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="throughputVal">Throughput</Label>
                        <Input
                          id={'throughputVal' + props.formikFilesystemTierPrefix}
                          className="mb-4"
                          type="number"
                          value={props.filesystem?.throughputMbs}
                          readOnly
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col xs={9}>
                      <FormGroup>
                        <Label htmlFor="throughput">In MB/s</Label>
                        <Slider
                          id={'throughput' + props.formikFilesystemTierPrefix}
                          defaultValue={Math.log2(props.filesystem?.throughputMbs)}
                          onChange={onThroughputChange}
                          marks={tpMarks}
                          className="mb-4"
                          included={false}
                          min={7}
                          max={11}
                          step={1}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="volumeVal">Volume</Label>
                        <Input
                          id={'volumeVal' + props.formikFilesystemTierPrefix}
                          className="mb-4"
                          type="number"
                          value={props.filesystem?.volumeSize}
                          readOnly
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col xs={9}>
                      <FormGroup>
                        <Label htmlFor="volume">In GiB</Label>
                        <Slider
                          id={'volume' + props.formikFilesystemTierPrefix}
                          defaultValue={props.filesystem?.volumeSize}
                          onChange={onVolumeChange}
                          className="mb-4"
                          marks={volMarks}
                          included={false}
                          min={1}
                          max={100}
                          step={1}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col sm={6} className="mt-2">
                  <Row>
                    <Col xs={6}>
                      <SaasBoostInput
                        key={props.formikFilesystemTierPrefix + '.dailyBackupTime'}
                        label="Daily Backup Time (UTC)"
                        name={props.formikFilesystemTierPrefix + '.dailyBackupTime'}
                        type="time"
                        disabled={props.isLocked}
                      />
                    </Col>
                    <Col xs={6}>
                      <Label>Weekly Maintenance Day/Time (UTC)</Label>
                      <InputGroup className="mb-3">
                        <Input
                          type="select"
                          onChange={onWeeklyDayChange}
                          value={props.filesystem?.weeklyMaintenanceDay}
                        >
                          <option value="1">Sun</option>
                          <option value="2">Mon</option>
                          <option value="3">Tue</option>
                          <option value="4">Wed</option>
                          <option value="5">Thu</option>
                          <option value="6">Fri</option>
                          <option value="7">Sat</option>
                        </Input>
                        <Input
                          key={props.formikFilesystemTierPrefix + '.weeklyMaintenanceTime'}
                          onChange={onWeeklyMaintTimeChange}
                          value={props.filesystem?.weeklyMaintenanceTime}
                          name={props.formikFilesystemTierPrefix + '.weeklyMaintenanceTime'}
                          type="time"
                          disabled={props.isLocked}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      {this.props.containerOs === "WINDOWS" && (
                      <SaasBoostSelect
                        id={props.formikFilesystemTierPrefix + '.windowsMountDrive'}
                        label="Drive Letter Assignment"
                        name={props.formikFilesystemTierPrefix + '.windowsMountDrive'}
                        value={props.filesystem?.windowsMountDrive}
                      >
                        <option value="G:">G:</option>
                        <option value="H:">H:</option>
                        <option value="I:">I:</option>
                        <option value="J:">J:</option>
                        <option value="K:">K:</option>
                        <option value="L:">L:</option>
                        <option value="M:">M:</option>
                        <option value="N:">N:</option>
                        <option value="O:">O:</option>
                        <option value="P:">P:</option>
                        <option value="Q:">Q:</option>
                        <option value="R:">R:</option>
                        <option value="S:">S:</option>
                        <option value="T:">T:</option>
                        <option value="U:">U:</option>
                        <option value="V:">V:</option>
                        <option value="X:">X:</option>
                        <option value="Y:">Y:</option>
                        <option value="Z:">Z:</option>
                      </SaasBoostSelect>
                      )}
                    </Col>
                    <Col xs={6}>
                      <SaasBoostInput
                        key={props.formikFilesystemTierPrefix + '.backupRetentionDays'}
                        label="Backup Retention (Days)"
                        name={props.formikFilesystemTierPrefix + '.backupRetentionDays'}
                        type="number"
                        disabled={props.isLocked}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          } else {
            return (
                <Row>
                  <Col xl={6} className="mt-2">
                    <SaasBoostInput
                      key={props.formikServicePrefix + '.filesystem.mountPoint'}
                      label="Mount point"
                      name={props.formikServicePrefix + '.filesystem.mountPoint'}
                      type="text"
                      disabled={props.isLocked}
                    />
                  </Col>
                  {this.props.containerOs === "WINDOWS" && (
                    <Col xl={6} className="mt-2">
                      <SaasBoostCheckbox
                        id={props.formikServicePrefix + '.filesystem.configureManagedAd'}
                        name={this.props.formikServicePrefix + '.filesystem.configureManagedAd'}
                        label="Provision a Managed Microsoft AD."
                        tooltip="If selected, a new Managed Microsoft AD will be created for this service."
                      />
                    </Col>
                  )}
                </Row>
              )
          }
    }
  }

FsxOntapFilesystemOptions.propTypes = {
    setFieldValue: PropTypes.func,
    provisionFs: PropTypes.bool,
    containerOs: PropTypes.string,
    isLocked: PropTypes.bool,
    filesystem: PropTypes.object,
}