/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {FakeModelKernel} from '../test-helpers.js';

import {defineSampler, SamplerConstructor} from './sampler.js';
import {defineThreeDOMElement} from './three-dom-element.js';

const ThreeDOMElement = defineThreeDOMElement();

suite('api/sampler', () => {
  suite('defineSampler', () => {
    test('yields a valid constructor', () => {
      const GeneratedConstructor = defineSampler(ThreeDOMElement);
      const instance = new GeneratedConstructor(new FakeModelKernel(), {
        id: 0,
      });

      expect(instance).to.be.ok;
    });

    suite('the generated class', () => {
      let kernel: FakeModelKernel;
      let GeneratedConstructor: SamplerConstructor;


      setup(() => {
        kernel = new FakeModelKernel();
        GeneratedConstructor = defineSampler(ThreeDOMElement);
      });

      test('produces elements with the correct owner model', () => {
        const instance = new GeneratedConstructor(kernel, {id: 0});

        expect(instance.ownerModel).to.be.equal(kernel.model);
      });

      test('expresses the sampler name when available', () => {
        const instance = new GeneratedConstructor(kernel, {id: 0, name: 'foo'});

        expect(instance.name).to.be.equal('foo');
      });
    });
  });
});
