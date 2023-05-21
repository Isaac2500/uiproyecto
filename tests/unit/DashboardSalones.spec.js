import VueTestUtils from '@vue/test-utils';
import { expect, jest } from '@jest/globals';

import DashboardSalones from '../../src/views/DashboardSalones.vue';
import Crear from '../../src/views/Crear.vue';
import Editar from '../../src/views/Editar.vue';

//Mock axios
import axios from 'axios';
jest.mock('axios');

// Mock utilities
const MODEL_NAME = 'salones';
const listaSalones = [
  {
    id: 1,
    nombre: 'G1',
    tipo: 'Normal',
    capacidad: 11,
    estado: 'libre',
    comodidades: 'si',
  },
  {
    id: 2,
    nombre: 'H2',
    tipo: 'Laboratorio',
    capacidad: 11,
    estado: 'ocupado',
    comodidades: 'no',
  },
];
const AUTH_OBJECT = {
  headers: {
    Authorization: 'authorization null',
  },
};
import { API_BASE_URL } from '../../config/api';

describe('Dashboard Salones', () => {
  it(`should render ${MODEL_NAME} dashboard`, async () => {
    axios.get.mockResolvedValue({ data: listaSalones });

    const wrapper = VueTestUtils.shallowMount(DashboardSalones);

    expect(wrapper.text()).toContain('Salones');
    expect(wrapper.text()).toContain('Id');
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Capacidad');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Comodidades');
    expect(wrapper.text()).toContain('Estado');

    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/salones`,
      AUTH_OBJECT
    );

    await wrapper.vm.fetchSalones();
    await wrapper.vm.$nextTick();

    // Wait api list
    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');

    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(2);

    // Assert that the table rows contain the expected data
    expect(tableRows[0].text()).toContain('G1');
    expect(tableRows[0].text()).toContain('libre');
    expect(tableRows[1].text()).toContain('H2');
    expect(tableRows[1].text()).toContain('Laboratorio');
    // Reload the component by remounting it
    wrapper.unmount();
  });

  it(`should redirect to /crear/${MODEL_NAME}`, async () => {
    const wrapper = VueTestUtils.shallowMount(DashboardSalones, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.find(`#create-${MODEL_NAME}`).trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/crear/${MODEL_NAME}`
    );
    wrapper.unmount();
  });

  it(`should redirect to /editar/${MODEL_NAME}s`, async () => {
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardSalones, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    //Reload data
    await wrapper.setData({
      listaSalones,
    });
    await wrapper.vm.$nextTick();

    // Check if edit button is available
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonEdit = wrapper.find('tbody tr td:nth-child(7) b-button');

    //Trigger a click and redirect to correct route
    await buttonEdit.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/editar/' + firstId + '/salones'
    );
    wrapper.unmount();
  });

  it(`should create a new ${MODEL_NAME}`, async () => {
    const wrapper = VueTestUtils.shallowMount(Crear, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/crear/salones',
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Comodidades');
    expect(wrapper.text()).toContain('Capacidad');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Estado');

    //Fill inputs

    wrapper.find('#form_name').setValue('AR1');
    wrapper.find('#form_comodidades').setValue('si');
    wrapper.find('#form_capacidad').setValue(5);
    wrapper.find('#form_tipo').setValue('Artisticas');
    wrapper.find('#form_estado').setValue('matenimiento');

    // Create mock post method
    const newSalon = {
      id: 3,
      nombre: 'AR1',
      tipo: 'Artisticas',
      capacidad: 5,
      estado: 'matenimiento',
      comodidades: 'si',
    };
    axios.post.mockResolvedValue({ data: newSalon });
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check post API is called
    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/salones`,
      {
        nombre: 'AR1',
        tipo: 'Artisticas',
        capacidad: 5,
        estado: 'matenimiento',
        comodidades: 'si',
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboardsalones');
    wrapper.unmount();
  });

  it(`should edit a ${MODEL_NAME}`, async () => {
    // Create mock get method
    const currentAsignatura = listaSalones[0];
    axios.get.mockResolvedValue({ data: currentAsignatura });

    // Render component
    const wrapper = VueTestUtils.shallowMount(Editar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/editar/salones',
            params: {
              id: 1,
            },
          },
        },
      },
    });

    // Check get by ID API is called
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/${MODEL_NAME}/1`, {
      headers: {
        Authorization: 'Bearer null',
      },
    });

    await wrapper.vm.getRegister();
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Estado');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Capacidad');
    expect(wrapper.text()).toContain('Comodidades');

    //Check inputs has current data from alumno
    expect(wrapper.find('#form_name').element.value).toContain('G1');
    expect(wrapper.find('#form_capacidad').element.value).toContain('11');
    expect(wrapper.find('#form_tipo').element.value).toContain('Normal');
    expect(wrapper.find('#form_comodidades').element.value).toContain('si');
    expect(wrapper.find('#form_estado').element.value).toContain('libre');

    //Update field
    wrapper.find('#form_estado').setValue('ocupado');

    // Mock API put call
    axios.put.mockResolvedValue({
      data: { ...currentAsignatura, estado: 'mantenimiento' },
    });

    //Trigger update event
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check put API is called
    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}/1`,
      {
        nombre: 'G1',
        capacidad: 11,
        comodidades: 'si',
        tipo: 'Normal',
        estado: 'ocupado',
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboardsalones');
    wrapper.unmount();
  });

  it(`should delete a ${MODEL_NAME}`, async () => {
    axios.get.mockResolvedValue({ data: listaSalones });
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardSalones, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    // Wait api list
    await wrapper.vm.fetchSalones();
    await wrapper.vm.$nextTick();

    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');
    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(2);

    // Check if delete button is available on first row
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonDelete = wrapper.find('tbody tr td:nth-child(8) b-button');

    // Mock API delete call
    axios.delete.mockResolvedValue({
      data: listaSalones[0],
    });
    axios.get.mockResolvedValue({ data: [listaSalones[1]] });

    //Trigger a click and redirect to correct route
    await buttonDelete.trigger('click');

    // Check delete API is called
    expect(axios.delete).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}/${firstId}`,
      AUTH_OBJECT
    );

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/dashboard${MODEL_NAME}`
    );

    wrapper.unmount();
  });
});
