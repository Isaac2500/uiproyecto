import VueTestUtils from '@vue/test-utils';
import { expect, jest } from '@jest/globals';

import DashboardAlumnos from '../../src/views/DashboardAlumnos.vue';
import Crear from '../../src/views/Crear.vue';
import Editar from '../../src/views/Editar.vue';

//Mock axios
import axios from 'axios';
jest.mock('axios');

// Mock utilities
const MODEL_NAME = 'alumno';
const listaAlumnos = [
  {
    id: 1,
    nombres: 'Mob',
    apellidoPaterno: 'Kageyama',
    apellidoMaterno: '',
    matricula: 11111222,
    promedio: 99,
  },
];
const AUTH_OBJECT = {
  headers: {
    Authorization: 'authorization null',
  },
};
import { API_BASE_URL } from '../../config/api';

describe('Dashboard Alumnos', () => {
  it(`should render ${MODEL_NAME} dashboard`, async () => {
    axios.get.mockResolvedValue({ data: listaAlumnos });

    const wrapper = VueTestUtils.shallowMount(DashboardAlumnos);

    expect(wrapper.text()).toContain('Alumnos');
    expect(wrapper.text()).toContain('Id');
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Apellido Materno');
    expect(wrapper.text()).toContain('Matricula');
    expect(wrapper.text()).toContain('Promedio');
    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/alumnos`,
      AUTH_OBJECT
    );

    await wrapper.vm.fetchAlumnos();
    await wrapper.vm.$nextTick();

    // Wait api list
    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');

    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(1);

    // Assert that the table rows contain the expected data
    expect(tableRows[0].text()).toContain('1');
    expect(tableRows[0].text()).toContain('Mob');
    expect(tableRows[0].text()).toContain('Kageyama');
    // Reload the component by remounting it
    wrapper.unmount();
  });

  it(`should redirect to /crear/${MODEL_NAME}s`, async () => {
    const wrapper = VueTestUtils.shallowMount(DashboardAlumnos, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.find('#createUser').trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/crear/${MODEL_NAME}s`
    );
    wrapper.unmount();
  });

  it(`should redirect to /editar/${MODEL_NAME}s`, async () => {
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardAlumnos, {
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
      listaAlumnos,
    });
    await wrapper.vm.$nextTick();

    // Check if edit button is available
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonEdit = wrapper.find('tbody tr td:nth-child(7) b-button');

    //Trigger a click and redirect to correct route
    await buttonEdit.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/editar/' + firstId + '/alumnos'
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
            path: '/crear/alumnos',
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Matricula');
    expect(wrapper.text()).toContain('Apellido Materno');
    expect(wrapper.text()).toContain('Promedio');

    //Fill inputs
    wrapper.find('#form_name').setValue('Shanks');
    wrapper.find('#form_apellidoPaterno').setValue('Akagami');
    wrapper.find('#form_apellidoMaterno').setValue('');
    wrapper.find('#form_matricula').setValue(1111123);
    wrapper.find('#form_promedio').setValue(15);

    // Create mock post method
    const newAlumno = {
      id: 2,
      apellidoMaterno: '',
      apellidoPaterno: 'Akagami',
      horasClase: 15,
      nombres: 'Shanks',
      numeroEmpleado: 1111123,
    };
    axios.post.mockResolvedValue({ data: newAlumno });
    await wrapper.find('#send-alumno').trigger('click');

    // Check post API is called
    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/alumnos`,
      {
        apellidoMaterno: '',
        apellidoPaterno: 'Akagami',
        matricula: '1111123',
        nombres: 'Shanks',
        promedio: 15,
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboardalumnos');
    wrapper.unmount();
  });

  it(`should edit a ${MODEL_NAME}`, async () => {
    // Create mock get method
    const currentAlumno = listaAlumnos[0];
    axios.get.mockResolvedValue({ data: currentAlumno });

    // Render component
    const wrapper = VueTestUtils.shallowMount(Editar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/editar/alumnos',
            params: {
              id: 1,
            },
          },
        },
      },
    });

    // Check get by ID API is called
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/${MODEL_NAME}s/1`, {
      headers: {
        Authorization: 'Bearer null',
      },
    });

    await wrapper.vm.getRegister();
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Matricula');
    expect(wrapper.text()).toContain('Promedio');

    //Check inputs has current data from alumno
    expect(wrapper.find('#form_name').element.value).toContain('Mob');
    expect(wrapper.find('#form_apellidoPaterno').element.value).toContain(
      'Kageyama'
    );
    expect(wrapper.find('#form_apellidoMaterno').element.value).toContain('');
    expect(wrapper.find('#form_matricula').element.value).toContain('11111222');
    expect(wrapper.find('#form_promedio').element.value).toContain('99');

    //Update field
    wrapper.find('#form_apellidoMaterno').setValue('Perez');

    // Mock API put call
    axios.put.mockResolvedValue({
      data: { ...currentAlumno, apellidoMaterno: 'Perez' },
    });

    //Trigger update event
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check put API is called
    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}s/1`,
      {
        apellidoMaterno: 'Perez',
        apellidoPaterno: 'Kageyama',
        matricula: 11111222,
        nombres: 'Mob',
        promedio: 99,
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboardalumnos');
    wrapper.unmount();
  });

  it(`should delete a ${MODEL_NAME}`, async () => {
    axios.get.mockResolvedValue({ data: listaAlumnos });
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardAlumnos, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    // Wait api list
    await wrapper.vm.fetchAlumnos();
    await wrapper.vm.$nextTick();

    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');
    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(1);

    // Check if delete button is available on first row
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonDelete = wrapper.find('tbody tr td:nth-child(8) b-button');

    // Mock API delete call
    axios.delete.mockResolvedValue({
      data: listaAlumnos[0],
    });
    axios.get.mockResolvedValue({ data: [] });

    //Trigger a click and redirect to correct route
    await buttonDelete.trigger('click');

    // Check delete API is called
    expect(axios.delete).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}s/${firstId}`,
      AUTH_OBJECT
    );

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/dashboard${MODEL_NAME}s`
    );
    wrapper.unmount();
  });
});
